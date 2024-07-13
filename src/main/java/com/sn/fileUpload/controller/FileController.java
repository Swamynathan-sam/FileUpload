package com.sn.fileUpload.controller;

import com.sn.fileUpload.entity.FileEntity;
import com.sn.fileUpload.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:4200")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file")MultipartFile file){

        FileEntity fileEntity = null;
        try {
            fileEntity = fileStorageService.storeFile(file);
            return new ResponseEntity<>("File uploaded sucessfully: " + fileEntity.getId() , HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Could not able to upload file: "+ e.getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id){
        FileEntity fileEntity = fileStorageService.getFile(id);
        if(fileEntity== null ){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,"attachment; fileName=\""+fileEntity.getFileName() +"\"")
                .body(fileEntity.getData());
    }


}
