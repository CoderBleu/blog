package com.blog.business.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/consumer")
    public String TestConsumer() {
        return  restTemplate.getForObject("http://localhost:9110/provider",String.class);
    }

    @GetMapping("/user")
    public String TestConsumer1() {
        return  restTemplate.getForObject("http://localhost:9110/provider",String.class);
    }
}