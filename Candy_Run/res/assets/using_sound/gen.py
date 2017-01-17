import os
import json

sound = []
startId = 0

for file in os.listdir("."):
	if file.endswith(".mp3"):
		sound.append("res/assets/using_sound/" + file)
		startId = startId + 1

with open("sound_not_id.json", "w") as outFile:
	json.dump(sound, outFile)