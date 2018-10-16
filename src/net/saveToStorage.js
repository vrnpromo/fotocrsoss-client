import {App} from './../app'
import { DataLoader } from '../net/DataLoader';


export function saveToStorage(_saves, callback = ()=>{}) {
    App.net.storageSet(DataLoader.key_data, JSON.stringify(_saves), resp => {
        console.log('storageSet: ', resp);
        callback();
    })
}