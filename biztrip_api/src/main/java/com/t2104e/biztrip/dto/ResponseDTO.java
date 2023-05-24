package com.t2104e.biztrip.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO<T> {
    private int code;
    private String status;
    private String message;
    private int pageNumber;
    private int perPage;
    private long totalItems;
    private int totalPages;
    private String sortField;
    private String sortDir;
    private T data;
}
