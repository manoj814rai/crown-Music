
"use strict"

import {API_URL} from '../utils/Constants';

const getSongList = async () => {
    try{
        let response = await fetch( API_URL.SONG_LIST,  {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let json = await response.json();
        json.success = true;
        return json;
    }
    catch (error) {
        console.error(error);
        return {success: false, resultCount: 0, results: [], error: 'something went wrong !'}
    }
};

export {
    getSongList
}
