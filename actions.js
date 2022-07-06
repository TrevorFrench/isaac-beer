const csvtojson = require("csvtojson")
//------------------------------------------------------------------------------
//---------------------------INITIALIZE DB CONNECTION---------------------------
//------------------------------------------------------------------------------
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'uyvcneifzzhcxi',
  host: 'ec2-52-204-195-41.compute-1.amazonaws.com',
  database: 'd3r5159cs20r37',
  password: 'dfdd94016f7e9e472819530f5cc8877af9aaf1f9bfa639d407ce49c56560ccd0',
  port: 5432,
  ssl: true,
})

//------------------------------------------------------------------------------
//----------------------------CREATES STATISTICS TABLE--------------------------
//------------------------------------------------------------------------------
const create_statistics_table = (req, res) => {
  const sql = "\
    CREATE TABLE statistics (\
      case_name varchar,\
      exchange varchar,\
      transaction_count int\
    );";
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
}

//------------------------------------------------------------------------------
//--------------------------INSERT INTO STATISTICS TABLE------------------------
//------------------------------------------------------------------------------
const insert_into_statistics_table = (req, res) => {
  csvData = req.files.csvfile.data.toString('utf8');
  caseName = req.body.caseName;
  exchange = req.body.exchange;
  console.log(exchange)
  return csvtojson().fromString(csvData).then(json => 
  {
    const sql = "\
    INSERT INTO statistics (\
      case_name\
      , exchange\
      , transaction_count\
      )\
    VALUES ('" + caseName + "'\
    , '" + exchange + "'\
    , " + json.length + ");";
    console.log(sql)
    pool.query(sql, (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows);
    });
  })


}

//------------------------------------------------------------------------------
//--------------------------------EXPORT MODULES--------------------------------
//------------------------------------------------------------------------------
module.exports = {
    create_statistics_table,
    insert_into_statistics_table
  }