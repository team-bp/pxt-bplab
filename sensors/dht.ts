/**
* BP Lab Extensions
*/
//% weight=1 color=#0066CB icon="\uf0ad" block="BP Lab"
//% groups='["DHT11"]'
namespace BPLAB {
    export enum DHT11Type {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,

        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,

        //% block="humidity(0~100)" enumval=2
        DHT11_humidity,
    }

    export let dht11Humidity = 0
    export let dht11Temperature = 0
}