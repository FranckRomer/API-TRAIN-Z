import { Body, Controller, Get, HttpStatus, Post, Res, Patch } from '@nestjs/common';
// import path from 'path';
const moment = require('moment');
import { InsertData, UpgrateData, FindData } from "./crud/index"
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
        console.log(createDisp);
        const body = createDisp
        let proyect = body.proyect
        const collection = body.clase + "_" + body.tipo
        console.log(proyect);
        console.log(collection);
        if (proyect == "undefind") {
            proyect = "proyectos_sin_asignar"
        }
        const result = await InsertData(body, proyect, collection)
        console.log(result);

        return res.status(HttpStatus.OK).json(true)
    }

    @Patch('/tiempo_real')
    async actulizarData(@Body() updateDisp: any, @Res() res) {
        console.log(updateDisp);
        const body = updateDisp
        let proyect = body.proyect
        const collection = body.clase + "_" + body.tipo
        console.log(proyect);
        console.log(collection);
        if (proyect == "undefind") {
            proyect = "proyectos_sin_asignar"
        }
        const query = { numero_serial: body.numero_serial }
        const result = await UpgrateData(body, query, proyect, collection)
        console.log(result);

        return res.status(HttpStatus.OK).json(true)
    }

    @Patch('/status')
    async statusDisp(@Body() statusDisp: any, @Res() res) {
        console.log(statusDisp);
        const body = statusDisp
        let proyect = body.proyect
        if (proyect == "undefined") {
            proyect = "proyectos_sin_asignar"
        }
        let collection = body.clase + "_" + body.tipo
        const query = { numero_serial: body.numero_serial }
        let result_update = await UpgrateData(body, query, proyect, collection)
        console.log(result_update);
        collection = body.clase + "_firmware"
        let result = await FindData(query, proyect, collection)
        if (result.upsertedId == null) {
            if (body.clase == "ALCANCIA") {
                const alcancia_firmware = {
                    hora_reset: "03:30"
                }
                await InsertData(body, proyect, collection)
                return res.status(HttpStatus.OK).json(alcancia_firmware)
            } else if(body.clase == "CONTADOR") {
                const contador_firmware = {
                    hora_reset: "03:30"
                }
                await InsertData(contador_firmware, proyect, collection)
                return res.status(HttpStatus.OK).json(contador_firmware)
            } else if(body.clase == "GPS"){
                const gps_firmware ={
                    ruta: "",
                    unidad: "",
                    ramal: ""
                }
                await InsertData(gps_firmware, proyect, collection)
                return res.status(HttpStatus.OK).json(gps_firmware)
            } else if(body.clase == "BIA"){
                const bia_firmware ={
                    reset: "0",
                    vigencia: "2021-01-31-",
                    RTC: "2021-01-08 09:20:20",
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
                    ssid: "RED ACCESA",
                    password: "037E32E7",
                    proyect: "proyectos_sin_asignar",
                }
                await InsertData(bia_firmware, proyect, collection)
                return res.status(HttpStatus.OK).json(bia_firmware)
            }
        }
        return res.status(HttpStatus.OK).json(result)
    }

    @Patch('/bia')
    async statusBia(@Body() statusDisp: any, @Res() res) {
        console.log(statusDisp);
        const body = statusDisp
        let proyect = body.proyect
        let collection = body.clase + "_" + body.tipo
        console.log(proyect);
        console.log(collection);
        
        return res.status(HttpStatus.OK).json("Hola Javiercito :D")
    }
}


