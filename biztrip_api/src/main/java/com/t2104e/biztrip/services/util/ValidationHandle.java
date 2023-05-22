package com.t2104e.biztrip.services.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;


@Service
public class ValidationHandle {

    public List<String> validation(BindingResult result){
        if (result.hasErrors()) {
            List<String> listMsg = new ArrayList<>();

            for (ObjectError err : result.getAllErrors()) {
                String field = ((FieldError) err).getField();
                listMsg.add(field + ": " + err.getDefaultMessage());
            }
            return  listMsg;
        }
        return null;
    }
}
