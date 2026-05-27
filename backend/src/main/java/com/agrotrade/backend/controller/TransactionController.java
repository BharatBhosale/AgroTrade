package com.agrotrade.backend.controller;

import com.agrotrade.backend.model.Transaction;
import com.agrotrade.backend.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    // CREATE TRANSACTION
    @PostMapping("/create")
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction
    ) {

        try {

            Transaction savedTransaction =
                    transactionRepository.save(transaction);

            return ResponseEntity.ok(savedTransaction);

        } catch (Exception e) {

            System.out.println(
                    "Transaction Error: "
                            + e.getMessage()
            );

            return ResponseEntity
                    .status(500)
                    .build();
        }
    }

    // GET ALL TRANSACTIONS
    @GetMapping("/all")
    public ResponseEntity<List<Transaction>>
    getAllTransactions() {

        try {

            List<Transaction> transactions =
                    transactionRepository.findAll();

            return ResponseEntity.ok(transactions);

        } catch (Exception e) {

            System.out.println(
                    "Fetch Error: "
                            + e.getMessage()
            );

            return ResponseEntity
                    .status(500)
                    .build();
        }
    }

    // GET FARMER TRANSACTIONS USING EMAIL
    @GetMapping("/farmer/email/{email}")
    public ResponseEntity<List<Transaction>>
    getFarmerTransactionsByEmail(
            @PathVariable String email
    ) {

        try {

            List<Transaction> transactions =
                    transactionRepository
                            .findByFarmerEmail(email);

            return ResponseEntity.ok(transactions);

        } catch (Exception e) {

            System.out.println(
                    "Farmer Transaction Error: "
                            + e.getMessage()
            );

            return ResponseEntity
                    .status(500)
                    .build();
        }
    }

    // GET TRADER TRANSACTIONS USING EMAIL
    @GetMapping("/trader/email/{email}")
    public ResponseEntity<List<Transaction>>
    getTraderTransactionsByEmail(
            @PathVariable String email
    ) {

        try {

            List<Transaction> transactions =
                    transactionRepository
                            .findByTraderEmail(email);

            return ResponseEntity.ok(transactions);

        } catch (Exception e) {

            System.out.println(
                    "Trader Transaction Error: "
                            + e.getMessage()
            );

            return ResponseEntity
                    .status(500)
                    .build();
        }
    }

    // GET TRANSACTION BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Transaction>
    getTransactionById(
            @PathVariable Long id
    ) {

        try {

            return transactionRepository
                    .findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() ->
                            ResponseEntity
                                    .notFound()
                                    .build()
                    );

        } catch (Exception e) {

            System.out.println(
                    "Get Transaction Error: "
                            + e.getMessage()
            );

            return ResponseEntity
                    .status(500)
                    .build();
        }
    }
}