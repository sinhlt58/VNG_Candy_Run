import os
import json

lobby = {}
startId = 0

for file in os.listdir("."):
	if file.endswith(".png"):
		lobby[startId] = file
		startId = startId + 1

with open("textureIds.json", "w") as outFile:
	json.dump(lobby, outFile)