import { Body, Controller, Get, HttpStatus, Post, Res, Patch } from '@nestjs/common';
// import path from 'path';
const moment = require('moment');
import { InsertData, UpgrateData, FindData } from "./crud/index"
// const {InsertData, UpgrateData}  import "./crud/index.js"

@Controller('disp_train')
export class DispTrainController {
    @Get('/horaActual')
    horaActual(@Res() res) {
        return res.status(HttpStatus.OK).json({
            anio: moment().year(),
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
        let collection = body.clase + "_" + body.tipo
        console.log(proyect);
        console.log(collection);
        if (proyect == "undefind") {
            proyect = "proyectos_sin_asignar"
        }
        const query = { numero_serial: body.numero_serial }
        let result_update = await UpgrateData(body, query, proyect, collection)
        console.log(result_update);
        collection = body.clase + "_firmware"
        let result = await FindData(query, proyect, collection)
        if (result == "") {
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
            }
        }
        return res.status(HttpStatus.OK).json(result)
    }
}


