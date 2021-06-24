const { Client } = require('pg');
const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

const client = new Client({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
client.connect();

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`;

client.query(queryString, values)
.then(res => {
  console.log('connected');
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
});