SELECT assignments.day, count(*) AS number_of_assignments, sum(assignments.duration) AS duration
FROM assignments 
GROUP BY assignments.day
ORDER BY assignments.day;