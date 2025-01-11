package com.timesheet.timesheet.status;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/status")
public class StatusContoroller {

    @Autowired
    private StatusService service;

    @GetMapping
    public List<Status> getAllStatus() {
        return service.findAll();
    }

    @PostMapping
    public Status addStatus(@RequestBody Status status) {
        return service.save(status);
    }
    
}
