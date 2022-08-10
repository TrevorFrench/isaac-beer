//------------------------------------------------------------------------------
//---------------------------INITIALIZE DB CONNECTION---------------------------
//------------------------------------------------------------------------------
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ogljtmsfsccehp',
  host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
  database: 'd4c18r3meh2uhu',
  password: '66ee89ea6005539c144cf6e141e27a30776a2c2f1456dadbbd9f3a5591490b80',
  port: 5432,
  ssl: true,
})

//------------------------------------------------------------------------------
//----------------------------CREATES STATISTICS TABLE--------------------------
//------------------------------------------------------------------------------
const create_items_table = (req, res) => {
  const sql = "\
    CREATE TABLE items (\
      id int,\
      name varchar\
    );";
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
}

//------------------------------------------------------------------------------
//--------------------------------EXPORT MODULES--------------------------------
//------------------------------------------------------------------------------
module.exports = {
    create_items_table
  }