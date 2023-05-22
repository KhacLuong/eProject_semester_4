package com.t2104e.biztrip.utils;

import org.springframework.data.domain.Sort;

public final class Helper {
    public static Sort sortQuery(String sortField, String sortDir) {
        return sortDir.equals("asc") ? Sort.by(Sort.Order.asc(sortField)) : Sort.by(Sort.Order.desc(sortField));
    }
}
