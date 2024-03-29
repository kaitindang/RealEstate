package com.example.crawldata.service;

import com.example.crawldata.model.Dbsequence;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;

@Service
public class SequenceGeneratorService {
    @Autowired
    private MongoOperations mongoOperations;

    public int getSequenceNumber(String sequenceName){
        Query query = new Query(Criteria.where("id").is(sequenceName));
        Update update = new Update().inc("seqNo",1);
        Dbsequence counter = mongoOperations.findAndModify(query,update,options().returnNew(true).upsert(true), Dbsequence.class);
        return !Objects.isNull(counter) ? counter.getSeqNo() : 1;
    }
}
