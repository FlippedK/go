package main

import (
	"database/sql"

	"encoding/json"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type lists struct {
	id   int    `json:"id"`
	info string `json:"info"`
}

func api(c *gin.Context) {
	db, err := sql.Open("mysql", "root:root@/test")

	if err != nil {
		panic(err)
	}
	defer db.Close()

	db.Exec("insert into test.lists (info) values (?)", "Hello Wolrd!")

	c.JSON(200, gin.H{
		"message": "",
	})
}

func all(c *gin.Context) {
	db, err := sql.Open("mysql", "root:root@/test")

	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select * from test.lists")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	list := []lists{}

	for rows.Next() {
		l := lists{}
		rows.Scan(&l.id, &l.info)
		list = append(list, l)
	}

	b, _ := json.Marshal(list)

	c.JSON(200, string(b))
}

func main() {
	r := gin.Default()
	r.GET("/api", api)
	r.GET("/all", all)
	r.Run("0.0.0.0:9090")
}
