import json
import os

startId = 80
outObjectTypes = {}
mapIds = {}

for fn in os.listdir('.'):
    if os.path.isfile(fn):
        if not fn == "gen_trapIds.py":
            outObjectTypes[startId] = {}
            outObjectTypes[startId]["texture"] = fn
            outObjectTypes[startId]["classType"] = 2
            outObjectTypes[startId]["damage"] = 10
            mapIds[fn] = startId
            startId = startId + 1

outObjectTypes["map"] = mapIds
groudDataOutFile = "trap_ids.json"
with open(groudDataOutFile, 'w') as outFile:
    json.dump(outObjectTypes, outFile)