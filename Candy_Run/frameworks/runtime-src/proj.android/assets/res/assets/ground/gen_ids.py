import json
import os

startId = 23
outObjectTypes = {}
mapIds = {}

for fn in os.listdir('.'):
    if os.path.isfile(fn):
        if not fn == "gen_ids.py":
            outObjectTypes[startId] = {}
            outObjectTypes[startId]["texture"] = fn
            outObjectTypes[startId]["classType"] = 1
            mapIds[fn] = startId
            startId = startId + 1

outObjectTypes["map"] = mapIds
groudDataOutFile = "ground_ids.json"
with open(groudDataOutFile, 'w') as outFile:
    json.dump(outObjectTypes, outFile)



