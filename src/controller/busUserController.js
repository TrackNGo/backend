const BusRoute = require('../models/busRouteModel');
const BusLocation = require('../models/busLocationModel');

async function getBusLocation(req, res) {
    try {
        const busNumber = req.params.busNumber;
        console.log(busNumber)
        const buses = await BusLocation.findOne({'busNumber':busNumber});
        console.log(buses);
        return res.status(200).json(buses);
    } catch (error) {
        res.status(500).send('Error fetching bus locations');
    }
}

async function getLocationCodeSearchByName(req, res) {
    const { startLocation, endLocation } = req.body;
    const API_KEY = 'AIzaSyAiQ_WJER_3HDCs0B6tH01WPTCzB1COSLA';

    console.log(startLocation);
    console.log(endLocation);

    try {
        const startLocationResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: startLocation,
                key: API_KEY,
            },
        });

        const endLocationResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: endLocation,
                key: API_KEY,
            },
        });

        if (startLocationResponse.data.status === "OK" && endLocationResponse.data.status === "OK") {

            const sourceLocation = startLocationResponse.data.results[0].geometry.location;
            const destinationLocation = endLocationResponse.data.results[0].geometry.location;
            
            // Get the route path between start and end locations
            const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
                params: {
                    origin: `${sourceLocation.lat},${sourceLocation.lng}`,
                    destination: `${destinationLocation.lat},${destinationLocation.lng}`,
                    key: API_KEY // Replace with your Google API key
                }
            });

            if (response.data.status === "OK") {

                const route = response.data.routes[0].overview_polyline.points

                console.log(typeof(sourceLocation));
                console.log(typeof(destinationLocation));
                console.log(typeof(route));

                console.log(route)
                

                res.json({
                    sourceLocation,
                    destinationLocation,
                    route
                });
            } else {
                res.status(404).json({ error: "Route not found." });
            }    
        } else {
            res.status(404).json({ error: "Location not found." });
        }        
    } catch (error) {
        console.error("Error fetching directions:", error);
        res.status(500).send("Error fetching directions");
    }
}

async function getBus(req, res) {

    const { startLocation, endLocation } = req.body;

    console.log(startLocation)
    console.log(endLocation)

    try {

        const busRouteWithBus = await BusRoute.find(
            {
                "startLocation":startLocation,
                "endLocation":endLocation
            }
        )

        console.log(busRouteWithBus)
        res.json({busRouteWithBus});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching route', error });
    }  
}

async function getRoute(req, res) {

    const { busNumber } = req.body;

    console.log(busNumber)

    try {
        const specificBusRoute = await BusRoute.findOne({"busNumber":busNumber})

        console.log(specificBusRoute)

        res.json({specificBusRoute});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching route', error });
    }  
}

module.exports = {
    getRoute,
    getBusLocation,
    getLocationCodeSearchByName,
    getBus
}