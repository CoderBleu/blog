package com.blog.business.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/provider")
    public String TestProvider() {
        return "生产者调用";
    }
}