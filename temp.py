from pymongo import MongoClient

mongo_host = 'identity-service-mongodb-svc.default.svc.cluster.local'
mongo_port = 27017
mongo_username = 'mis-admin'
mongo_password = 'mis@2023'

client = MongoClient(mongo_host, username=mongo_username, password=mongo_password)

print(client)
print(client.list_database_names())

mydb = client["students"]
mycol = mydb["basic_details"]

to_insert = [
    {"name": "Himanshu Das", "adm": "20JE0418"},
    {"name": "Raunak Asnani", "adm": "20JE0775"},
    {"name": "Lay Patel", "adm": "20JE0518"}
]

x = mycol.insert_many(to_insert)
print(x.inserted_ids)