const pool = require("../config/db");
const addClient = async (ctx) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = ctx.request.body;

    const newClient = await pool.query(
      `
        insert into client (client_last_name,client_first_name,client_phone_number,client_info,client_photo)
        values($1,$2,$3,$4,$5) returning *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
      ]
    );
    console.log(newClient);
    ctx.body = newClient.rows;
  } catch (error) {
    console.log(error);
    ctx.body = "Serverda xatolik";
  }
};
const getClient = async (ctx) => {
  try {
    const client = await pool.query(`select * from client`);
    ctx.body = client.rows;
  } catch (error) {
    console.log(error);
    ctx.body = "Serverda xatolik";
  }
};
const getClientById = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (isNaN(id)) {
        return ctx.body = { massage: "invalid id" };
    }
    const client = await pool.query(
      `
        select * from client where id = $1
        `,
      [id]
    );
    if (client.rowCount == 0) {
        return ctx.body = { massage: "id is not defined" };
    }
    ctx.body = client.rows;
  } catch (error) {
    ctx.body = "Serverda xatolik";
  }
};











const updateClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = ctx.request.body;
    if (isNaN(id)) {
      return ctx.body = { massage: "invalid id" }
    }
    const client = await pool.query(
      `
        update client set client_last_name=$1,client_first_name=$2,client_phone_number=$3,client_info=$4,client_photo=$5 where id = $6 returning *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
        id,
      ]
    );
    if (client.rowCount == 0) {
      return ctx.body = { massage: "id is not defined" }
    }
    console.log(client);
    ctx.body = client.rows
  } catch (error) {
    console.log(error);
    ctx.body = "Serverda xatolik"
  }
}

















;

const deleteClient = async (ctx) => {
  try {
    const id = ctx.params.id;
    if (isNaN(id)) {
      return ctx.body = { massage: "invalid id" };
    }
    const client = await pool.query(
      `
      delete from client where id = $1
      `,
      [id]
    );
    if (client.rowCount == 0) {
      return ctx.body = { massage: "id is not defined" }
    }
    ctx.body = "Successfully deleted"
  } catch (error) {
    console.log(error);
    ctx.body = "Serverda xatolik"
  }
};

module.exports = {
  addClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
};

// const getClients = (ctx) => {
//   ctx.body = "Clients";
// };
// const getClient = (ctx) => {
//   ctx.body = "ID=" + ctx.params.id;
// };
// const addClient = (ctx) => {

//   console.log(ctx.request.body);
//   ctx.status=201
//   ctx.body=ctx.request.body
// };

// module.exports = {
//   getClients,
//   getClient,
//   addClient,
// };
