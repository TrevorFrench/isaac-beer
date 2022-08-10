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
//--------------------------INSERT INTO ITEMS TABLE------------------------
//------------------------------------------------------------------------------
const insert_into_items_table = (req, res) => {
  csvData = req.files.csvfile.data.toString('utf8');
  item_id = req.body.item_id;
  item_name = req.body.item_name;
  console.log(exchange)

  const sql = "\
  INSERT INTO itemss (\
    id\
    , name\
    )\
  VALUES ('" + item_id + "'\
  , '" + item_name + "'\
  );";
  console.log(sql)
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
    insert_into_items_table
  }