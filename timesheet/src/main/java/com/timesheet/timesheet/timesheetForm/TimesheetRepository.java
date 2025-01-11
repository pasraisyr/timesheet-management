package com.timesheet.timesheet.timesheetForm;



import org.springframework.data.jpa.repository.JpaRepository;


public interface TimesheetRepository extends JpaRepository<Timesheet, Long> {

}