package com.sn.fileUpload.service;

import com.sn.fileUpload.Repository.FileRepository;
import com.sn.fileUpload.entity.FileEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileStorageService {

    @Autowired
    private FileRepository fileRepository;

    @Transactional
    public FileEntity storeFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        FileEntity fileEntity=new FileEntity();
        fileEntity.setFileName(fileName);
        fileEntity.setData(file.getBytes());
       return fileRepository.save(fileEntity);
//        return fileEntity;
    }

    public FileEntity getFile(Long id) {
        return fileRepository.findById(id).orElse(null);
    }
}
