const fetch = require('node-fetch');


test('get all events', async () => {

    return fetch('http://localhost:3001/all')
        .then(res => {
            return res.json()
        })
        .then(res => {
            //console.log(res);
            expect(res.length).toBe(4);
        })
});


test('check if specific id exists', async () => {

    return fetch('http://localhost:3001/10')
        .then(res => {
            return res.json()
        })
        .then(res => {
            return expect(res.id).toBe(10);
        })
    })