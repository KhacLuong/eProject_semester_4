package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import jakarta.annotation.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

@Service
public class ResponseService {
    public static <T> ResponseDTO<T> ok(@Nullable T data, String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.OK.value());
        response.setStatus("Success");
        response.setMessage(message);
        response.setData(data);
        return response;
    }

    public static <T> ResponseDTO<T> ok(
            @Nullable T data, String message,
            int pageNumber,
            int perPage,
            long totalItems,
            int totalPages,
            String sortField,
            String sortDir) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.OK.value());
        response.setStatus("Success");
        response.setMessage(message);
        response.setPageNumber(pageNumber);
        response.setPerPage(perPage);
        response.setTotalItems(totalItems);
        response.setTotalPages(totalPages);
        response.setSortField(sortField);
        response.setSortDir(sortDir);
        response.setData(data);
        return response;
    }

    public static <T> ResponseDTO<T> created(T data, String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.CREATED.value());
        response.setStatus("Created");
        response.setMessage(message);
        response.setData(data);
        return response;
    }

    public static <T> ResponseDTO<T> noContent(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.NO_CONTENT.value());
        response.setStatus("No Content");
        response.setMessage(message);
        return response;
    }

    public static <T> ResponseDTO<T> conflict(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.CONFLICT.value());
        response.setStatus("Conflict");
        response.setMessage(message);
        return response;
    }

    public static <T> ResponseDTO<T> badRequest(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setStatus("Bad Request");
        response.setMessage(message);
        return response;
    }

    public static <T> ResponseDTO<T> unAuthorized(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.UNAUTHORIZED.value());
        response.setStatus("Unauthorized");
        response.setMessage(message);
        return response;
    }

    public static <T> ResponseDTO<T> forbidden(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.FORBIDDEN.value());
        response.setStatus("Forbidden");
        response.setMessage(message);
        return response;
    }

    public static <T> ResponseDTO<T> notFound(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.NOT_FOUND.value());
        response.setStatus("Not found");
        response.setMessage(message);
        return response;
    }

    public static <T> ResponseDTO<T> internalError(String message) {
        ResponseDTO<T> response = new ResponseDTO<>();
        response.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.setStatus("Internal server error");
        response.setMessage(message);
        return response;
    }
}
