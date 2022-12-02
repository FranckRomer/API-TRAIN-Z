import { Body, Controller, Get, HttpStatus, Post, Res, Patch, Query } from '@nestjs/common';
const moment = require('moment');
import { InsertData, UpgrateData, FindData } from "../../crud/index"

@Controller('tables')
export class TablesController {
    @Get('/hora')
    tables(@Res() res) {
        return res.status(HttpStatus.OK).json({
            ano: moment().year(),
            mes: moment().month() + 1,
            dia: moment().date(),
            hora: moment().hour(),
            minuto: moment().minute(),
            segundo: moment().second()
        })
    }

    //  http://192.168.1.109:4000/tables/find-data?clase=contador&numero_serial=CP:94:B5:55:16:75:68:A
    @Get('/find-data')
    async findData(@Query() query, @Res() res) {
        const clase = query.clase
        const numero_serial = query.numero_serial
        console.log("--------------------- Consulta de "+ clase +" ---------------------");
        console.log(clase.toLocaleUpperCase());
        console.log(numero_serial);
        let proyect = "trainz"
        const collection = clase.toLocaleUpperCase() + "_TIEMPO_REAL" 
        console.log(proyect);
        console.log(collection);
       let querys:object
        console.log(querys);
        if (numero_serial == undefined) {
            query = {numero_serie:""}
        } else {
             querys = {numero_serie: numero_serial}
        }
        const result = await FindData(querys, proyect, collection)
        // console.log(result);
        return res.status(200).json(result)
    }

    // http://192.168.1.109:4000/tables/find-firmware?clase=contador&numero_serial=CP:94:B5:55:16:75:68:A
    @Get('/find-firmware')
    async findFirmware(@Query() query, @Res() res) {
        const clase = query.clase
        const numero_serial = query.numero_serial
        console.log("--------------------- Consulta de "+ clase +" ---------------------");
        console.log(clase.toLocaleUpperCase());
        console.log(numero_serial);
        let proyect = "trainz"
        const collection = clase.toLocaleUpperCase() + "_firmware" 
        console.log(proyect);
        console.log(collection);
        const querys = {numero_serie: numero_serial}
        console.log(querys);
        
        const result = await FindData(querys, proyect, collection)
        console.log(result);
        return res.status(200).json(result)
    }

    //
    @Patch('/up-new-data')
    async actulizarData(@Body() updateDisp: any, @Res() res) {
        console.log("--------------------- Tiempo Real ---------------------");
        console.log(updateDisp);
        const body = updateDisp
        let proyect = "trainz"
        const collection = body.clase + "_firmware"
        console.log(proyect);
        console.log(collection);
        const query = { numero_serial: body.numero_serial }
        const result = await UpgrateData(body, query, proyect, collection)
        console.log(result);

        return res.status(201).json(true)
    }
}
