package com.t2104e.biztrip.services.eloquents;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.specialized.BlockBlobClient;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.IOException;


@Log4j2
@Service
@Transactional
public class FileService {

    @Autowired
    private BlobServiceClient blobServiceClient;
    public String uploadAndDownloadFile(@NonNull MultipartFile file, String containerName) {
        BlobHttpHeaders headers = new BlobHttpHeaders().setContentType("image/jpg");
        BlobContainerClient blobContainerClient = getBlobContainerClient(containerName);
        String filename = file.getOriginalFilename();
        BlockBlobClient blockBlobClient = blobContainerClient.getBlobClient(filename).getBlockBlobClient();
        try {
            // delete file if already exists in that container
            if (blockBlobClient.exists()) {
                blockBlobClient.delete();
            }
            // upload file to azure blob storage
            blockBlobClient.uploadWithResponse(new BufferedInputStream(file.getInputStream()), file.getSize(), headers, null, null, null, null, null, null);
            return blockBlobClient.getBlobUrl();
        } catch (IOException e) {
            log.error("Error while processing file {}", e.getLocalizedMessage());
            return null;
        }
    }

    private @NonNull BlobContainerClient getBlobContainerClient(@NonNull String containerName) {
        // create container if not exists
        BlobContainerClient blobContainerClient = blobServiceClient.getBlobContainerClient(containerName);
        if (!blobContainerClient.exists()) {
            blobContainerClient.create();
        }
        return blobContainerClient;
    }
}
