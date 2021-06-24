const { Client } = require('pg');
const args = process.argv.slice(2);

const client = new Client({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
client.connect();

client.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${args[0]}'
ORDER BY teacher;`)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
});