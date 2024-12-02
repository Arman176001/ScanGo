import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = "https://qihmprrmwqjbcnudwdwf.supabase.co"
const supabase = createClient(SUPABASE_URL, process.env.SERVICE_KEY);
const port = 3030;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/data", async (req, res) => {
    let userData = req.body;
    const { data: driverData, error: insertError } = await supabase
        .from('DriverData')
        .insert([
            {
                Name: userData.name,
                Phone: userData.phone,
                Pan: userData.pan,
                Reg_Num: userData.vehicleReg,
                UpiId: userData.upiId,
                Address: userData.address
            }
        ])
        .select();

    if (insertError) {
        console.error("Supabase Insert Error:", insertError);
        return res.status(500).json({ message: "Error inserting driver data", error: insertError });
    }

    res.status(200).json({ message: "Driver registered and scan history initialized successfully!", driverData });
});


app.get('/app', async (req, res) => {
    const id = req.query.id;

    // Check if the driver exists in DriverData
    const { data: driverData, error: driverError } = await supabase
        .from('DriverData')
        .select("*")
        .eq('id', id)
        .single();  // Fetch a single matching record

    if (driverError || !driverData) {
        // If the driver ID is invalid, show an error message
        return res.status(404).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Error</title>
            </head>
            <body>
                <h1>Error: Invalid Driver ID</h1>
                <p>The specified driver ID was not found. Please check the QR code or contact support.</p>
            </body>
            </html>
        `);
    }

    // Serve an HTML page with embedded JavaScript for valid driver ID
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Processing Scan</title>
            <script>
                // Function to get or create the deviceID cookie
                function getOrCreateDeviceID() {
                    let deviceID = document.cookie.replace(/(?:(?:^|.*;\\s*)deviceID\\s*\\=\\s*([^;]*).*$)|^.*$/, "$1");
                    if (!deviceID) {
                        deviceID = crypto.randomUUID();  // Generate a UUID for deviceID
                        document.cookie = \`deviceID=\${deviceID}; path=/; max-age=\${60 * 60 * 24 * 365}\`;
                    }
                    return deviceID;
                }

                async function trackScan() {
                    const deviceID = getOrCreateDeviceID();
                    const driverID = "${id}";  // Get driver ID from query

                    // Send deviceID and driverID to the server to track the scan
                    const response = await fetch('/trackScan', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: driverID, deviceID: deviceID })
                    });

                    const result = await response.json();
                    if (result.message) {
                        console.log(result.message);
                    }

                    // Redirect to main page after the scan is tracked
                    window.location.href = 'https://scango.tech/main';
                }

                // Run trackScan when the page loads
                window.onload = trackScan;
            </script>
        </head>
        <body>
            <h1>Processing your scan...</h1>
        </body>
        </html>
    `);
});


app.post('/trackScan', async (req, res) => {
    const { id, deviceID } = req.body;

    // Check for a recent scan from this deviceID
    const { data: recentScan, error: scanError } = await supabase
        .from('scanUserLog')
        .select("*")
        .eq('id', id)
        .eq('DeviceID', deviceID)
        .gte('ScanTime', new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString());  // 2 weeks ago

    if (scanError) {
        console.error("Supabase Query Error:", scanError);
        return res.status(500).json({ message: "Error checking recent scans", error: scanError });
    }

    if (recentScan && recentScan.length > 0) {
        return res.status(200).json({ message: "Scan already recorded recently." });
    }

    // Insert new scan record if no recent scan was found
    const { error: insertError } = await supabase
        .from('scanUserLog')
        .insert({ id: id, DeviceID: deviceID, ScanTime: new Date().toISOString() });

    if (insertError) {
        console.error("Supabase Insert Error:", insertError);
        return res.status(500).json({ message: "Error adding scan", error: insertError });
    }

    // Update driver scan count in DriverData
    const { data: driverData, error: driverError } = await supabase
        .from('DriverData')
        .select("Scans")
        .eq('id', id);

    if (driverError || !driverData || driverData.length === 0) {
        console.error("Supabase Driver Query Error:", driverError);
        return res.status(500).json({ message: "Error finding driver", error: driverError });
    }

    const newScanCount = (driverData[0].Scans || 0) + 1;

    const { error: updateError } = await supabase
        .from('DriverData')
        .update({ Scans: newScanCount })
        .eq('id', id);

    if (updateError) {
        console.error("Supabase Update Error:", updateError);
        return res.status(500).json({ message: "Error updating driver scans", error: updateError });
    }

    res.status(200).json({ message: "Scan counted successfully" });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})