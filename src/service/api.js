var data = require('../assets/locations.json');



export const getLocations = async () => {
    const TASMU_TOKEN = 'XMsrzeGo5toD9wi62QaSk7RJG85IVxwbcU437iceWPn2hHM5HbDwEvsvLQVuXzQR'
    const URL = 'https://tasmusmartparking.urbiotica.org/v6/organisms/org1254eb/projects/prj408c7a/zones/5/locations?uadmin_filter=config_locations&product_types=04,05,25,26,28,31,32&location_types=1'

    return data;

    // return await fetch(data, {
    //     method: 'GET',
    //     // headers: new Headers({
    //     //     'IDENTITY_KEY': TASMU_TOKEN
    //     // })
    // })
    //     .then(res => res.data)
    //     .catch(err => console.log(err))
}