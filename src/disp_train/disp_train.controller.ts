import { Body, Controller, Get, HttpStatus, Post, Res, Patch } from '@nestjs/common';
// import path from 'path';
const moment = require('moment');
import { InsertData, UpgrateData, FindData } from "../crud/index"
// const {InsertData, UpgrateData}  import "./crud/index.js"

@Controller('disp_train')
export class DispTrainController {
    
    //
    @Get('/horaActual')
    horaActual(@Res() res) {
        return res.status(HttpStatus.OK).json({
            ano: moment().year(),
            mes: moment().month() + 1,
            dia: moment().date(),
            hora: moment().hour(),
            minuto: moment().minute(),
            segundo: moment().second()
        })
    }

    @Post('/registro')
    async registroData(@Body() createDisp: any, @Res() res) {
        console.log("--------------------- Registro ---------------------");
        console.log(createDisp);
        const body = createDisp
        let proyect = "trainz"
        const collection = body.clase + "_" + body.tipo
        console.log(proyect);
        console.log(collection);
        // if (proyect == "undefind") {
        //     proyect = "proyectos_sin_asignar"
        // }
        const result = await InsertData(body, proyect, collection)
        console.log(result);

        return res.status(201).json(true)
    }

    @Patch('/tiempo_real')
    async actulizarData(@Body() updateDisp: any, @Res() res) {
        console.log("--------------------- Tiempo Real ---------------------");
        console.log(updateDisp);
        const body = updateDisp
        let proyect = "trainz"
        const collection = body.clase + "_" + body.tipo
        console.log(proyect);
        console.log(collection);
        // if (proyect == "undefind") {
        //     proyect = "proyectos_sin_asignar"
        // }
        const query = { numero_serie: body.numero_serie }
        const result = await UpgrateData(body, query, proyect, collection)
        console.log(result);

        return res.status(201).json(true)
    }

    @Patch('/status')
    async statusDisp(@Body() statusDisp: any, @Res() res) {
        console.log("--------------------- STATUS ---------------------");
        console.log(statusDisp);
        
        const body = statusDisp
        let proyect = "trainz"
        // if (proyect == "undefined") {
        //     proyect = "proyectos_sin_asignar"
        // }
        let collection = body.clase + "_" + body.tipo
        const query = { numero_serie: body.numero_serie }
        console.log(body.clase + "_" + body.tipo);
        
        let result_update = await UpgrateData(body, query, proyect, collection)
        console.log(result_update);
        collection = body.clase + "_firmware"
        let result = await FindData(query, proyect, collection)
        // console.log(result);
        
        if (result == "") {
            console.log("DATO NO ENCONTRADO");
            
            if (body.clase == "ALCANCIA") {
                const alcancia_firmware = {
                    hora_reset: "03:30"
                }
                await InsertData(body, proyect, collection)
                return res.status(HttpStatus.OK).json(alcancia_firmware)
            } else if(body.clase == "CONTADOR") {
                const contador_firmware = {
                    numero_serie: body.numero_serie,
                    ruta: "ACCESA",
                    unidad: "01",
                    ramal: "accesa",
                    ssid: "TRAINZ-ACCESA",
                    password: "1234567890",
                    status_server: "1",
                    tiempo_status: 20,
                    tiempo_real: 60,
                    tiempo_bloqueo: 5,
                    status_reset_values_contador: "0",
                    delete_sd_contador: "0",
                    key_contador: "123456789ABCDEFG",
                    actualizacion_firmware: 0,
                    hora_1_reinicio_contador: 3,
                    minuto_1_reinicio_contador: 0,
                    hora_2_reinicio_contador: 3,
                    minuto_2_reinicio_contador: 10,
                    ano_vigencia: 2030,
                    mes_vigencia: 12,
                    dia_vigencia: 24,
                    dispositivo: "DELANTERO",
                    proyect: "proyectos_sin_asignar",
                }
                await InsertData(contador_firmware, proyect, collection)
                return res.status(200).json(contador_firmware)
            } else if(body.clase == "GPS"){
                const gps_firmware ={
                    numero_serie: body.numero_serie,
                    ruta: "undefined",
                    unidad: "undefined",
                    ramal: "undefined",
                    frecuencia_tiempo_real: 10,
                    frecuencia_registro_gps: 20,
                    frecuencia_status: 20,
                    zona_horaria: -6,
                    geocercaLat: 20.011610249112156,
                    geocercaLong:  -98.80324750258833,
                    actualizacion_firmware_servidor_esp: 0,
                }
                
                
                await InsertData(gps_firmware, proyect, collection)
                return res.status(HttpStatus.OK).json(gps_firmware)
            } else if(body.clase == "BIA"){
                const bia_firmware ={
                    numero_serie: body.numero_serie,
                    reset: "0",
                    vigencia: "2023-12-12-",
                    // RTC: "2021-01-08 09:20:20",
                    Mensajeboleto: "SI NO RECIBE SU BOLETO O\r\n NO CORRESPONDE A SU TARIFA\r\nREPORTE AL CEL: 1234567890\r\n CONSERVE ESTE BOLETO,\r\n ES SU SEGURO DE VIAJERO.",
                    Tarifa_Name_1: "COMPLETO",
                    Tarifa_Name_2: "ESTUDIANTE",
                    Tarifa_Name_3: "3RA EDAD",
                    Tarifa_Name_4: "DISCAPACIDAD",
                    Tarifa_Value_1: 8.5,
                    Tarifa_Value_2: 6.0,
                    Tarifa_Value_3: 4.0,
                    Tarifa_Value_4: 0.0,
                    Ruta: "ACCESA",
                    Unidad: "01",
                    Ramal: "accesa",
                    Tel_ventas: "2222222222",
                    // time_sleep: "accesa",
                    reset_printer: "0",
                    time_contador_pantalla: "20",
                    mdash: 0,
                    time_send_data: 30,
                    Mensaje_pantalla: "BIENVENIDOS",
                    QR: "www.accesa.me",
                    key_mdash: "123456789ABCDEF",
                    ssid: "TRAINZ-ACCESA",
                    password: "1234567890",
                    proyect: "proyectos_sin_asignar",
                    hora_reset_local: 3,
                    min_reset_local:10,
                } 
                await InsertData(bia_firmware, proyect, collection)
                return res.status(200).json(bia_firmware)
            }else if(body.clase == "ADDS"){
                const adds_firmware ={
                    numero_serie: body.numero_serie,
                    reset: "0",
                    vigencia: "2023-12-12",                   
                    Ruta: "ACCESA",
                    Unidad: "01",
                    Ramal: "accesa",
                    proyect: "proyectos_sin_asignar",
                    tiempoEntreAnuncios: 5,  //minutos
                    // direccionRuta: "inicio" , // inicio y  regreso

                } 
                await InsertData(adds_firmware, proyect, collection)
                return res.status(200).json(adds_firmware)
            }
        }
        result[0].RTC = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(result[0].RTC);
        let newReset = result[0]
        if (body.clase == "BIA") {
            newReset.reset =  "0";            
        } else {    
            newReset.status_reset_values_contador = "0";
        }
        let result_update_reset = await UpgrateData(newReset, query, proyect, collection)
        console.log(result_update_reset);
        
        return res.status(200).json(result[0])
    }

    // @Patch('/bia')
    // async statusBia(@Body() statusDisp: any, @Res() res) {
    //     console.log(statusDisp);
    //     const body = statusDisp
    //     let proyect = body.proyect
    //     let collection = body.clase + "_" + body.tipo
    //     console.log(proyect);
    //     console.log(collection);
        
    //     return res.status(HttpStatus.OK).json("Hola Javiercito :D")
    // }
}


