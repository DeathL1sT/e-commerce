import client from "../config/DB"

export type PaymentDeatilsSchema={
id?:string,
orderId:string,
amount:number,
provider:string,
status:string
}

export default class PaymentDetails{
    index=async():Promise<PaymentDeatilsSchema[]>=>{
        try{
            const con = await client.connect()
            const sql = `SLECET * FROM paymentDetails RETURNING *`
            const result = await con.query(sql)
            const pay = result.rows
            con.release()
            return pay

        }catch(err){
            throw new Error(`Can not find any payment details...`)
        }
    }

    show =async (id:string):Promise<PaymentDeatilsSchema> => {
        try{
            const con = await client.connect()
            const sql = `SELECT * FROM paymentDetails Where id=$1 RETURNING *`
            const result =await con.query(sql,[id])
            const order =  result.rows[0]
            con.release()
            return order
        }catch(err){
            throw new Error(`Can not fin this payment details...`)
        }
    }

    create =async (p:PaymentDeatilsSchema):Promise<PaymentDeatilsSchema> => {
        try{
            const con = await client.connect()
            const sql = `INSERT INTO paymentDetails(orderId,amount,provider,status) VALUES($1,$2,$3,$4) RETURNING *`
            const result =await con.query(sql,[p.orderId,p.amount,p.provider,p.status])
            const pay =  result.rows[0]
            con.release()
            return pay
        }catch(err){
            throw new Error(`Can not create your payment details ....`)
        }
    }

    update =async (id:string,p:PaymentDeatilsSchema):Promise<PaymentDeatilsSchema> => {
        try{
            const con = await client.connect()
            const sql = `UPDATE  paymentDetails SET orderId=$1 ,amount= $2 ,provider=$3, status=$4 WHERE id=$5 RETURNING *`
            const result =await con.query(sql,[p.orderId,p.amount,p.provider,p.status,p.id])
            const pay =  result.rows[0]
            con.release()
            return pay
        }catch(err){
            throw new Error(`Can not update your payment details  ....`)
        }
    }

    delete =async (id:string):Promise<PaymentDeatilsSchema> => {
        try{
            const con = await client.connect()
            const sql = `delete * FROM paymentDetails Where id=$1 RETURNING *`
            const result =await con.query(sql,[id])
            const pay =  result.rows[0]
            con.release()
            return pay
        }catch(err){
            throw new Error(`Can not delete your payment details...`)
        }
    }
}