package com.sn.fileUpload.Repository;

import com.sn.fileUpload.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<FileEntity , Long> {
}
