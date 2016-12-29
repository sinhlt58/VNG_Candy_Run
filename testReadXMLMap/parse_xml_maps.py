import xml.etree.ElementTree as ET
import re
import json

groundsPerChunk = 4
widthOfOneGround = 92
widthOfOneChunk = widthOfOneGround*groundsPerChunk
numOfGround = 0

tree = ET.parse('MAP01.xml')

root = tree.getroot()

chunkDatasByObjectTypeIds = {}

allTextureNames = []

levelName =  "m" + str(int(root.get('Name').split("_")[-1]))

textureNameToObjectTypeIds = {
    "m1_trap_0_0_1.png" : 81, 
    "jelly_point.png" : 3,
    "jelly_bear_1_1.png" : 5,
    "jelly_bear_1_0.png" : 4,
    "jelly_boost.png" : 9,
    "m1_platform_0_0_0.png" : 23,
    "m1_trap_0_0_0.png" : 80,
    "m1_trap_0_2_1.png" : 86,
    "m1_trap_0_2_0.png" : 85,
    "jelly_health_2.png" : 13,
    "jelly_health_1.png" : 12,
    "jelly_coin_2.png" : 1,
    "jelly_coin_1.png" : 0
}

for item in root.iter('Item'):
    textureName = item[7].text.replace("\\", "-")
    originX = int(item[9][0].text)
    originY = int(item[9][1].text)
    realTextureName = re.split('-', textureName)[-1]

    if realTextureName.split("_")[0] == "platform" or realTextureName.split("_")[0] == "trap":
        if realTextureName.split("_")[0] == "platform":
            numOfGround = numOfGround + 1
        realTextureName = levelName + "_" + realTextureName

    realObjectTypeId = textureNameToObjectTypeIds[realTextureName]

    x = int(item[0][0].text)
    y = -int(item[0][1].text)

    if not chunkDatasByObjectTypeIds.has_key(realObjectTypeId):
        chunkDatasByObjectTypeIds[realObjectTypeId] = []

    chunkDatasByObjectTypeIds[realObjectTypeId].append({"x": x, "y" : y})
    
#for key in chunkDatasByObjectTypeIds.keys():
   #print key, len(chunkDatasByObjectTypeIds[key])

#calculate the width of the map
mapWidth = numOfGround * widthOfOneGround

#calculate number of chunk index
numChunkIndex = 0
if numOfGround % groundsPerChunk == 0:
    numChunkIndex = numOfGround / groundsPerChunk
else:
    numChunkIndex = numOfGround / groundsPerChunk + 1

#prepare data for chunks to write
chunks = {}
minX = 0; maxX = 0
for chunkIndex in range(0, numChunkIndex+1):
    if chunkIndex == 0:
        minX = 0
        maxX = widthOfOneChunk 
    else:
        minX = widthOfOneChunk * chunkIndex
        maxX = widthOfOneChunk * (chunkIndex + 1)
    
    #add data to chunk by chunkIndex
    chunks[chunkIndex] = {}
    chunks[chunkIndex]['level'] = 1
    chunks[chunkIndex]['data'] = {}
    for objectTypeId in chunkDatasByObjectTypeIds.keys():
        for position in chunkDatasByObjectTypeIds[objectTypeId]:
            if minX <= position["x"] and position["x"] < maxX:
                if not chunks[chunkIndex]['data'].has_key(objectTypeId):
                    chunks[chunkIndex]['data'][objectTypeId] = []
                chunks[chunkIndex]['data'][objectTypeId].append(position)

chunkDataOutFile = "chunks.json"
with open(chunkDataOutFile, 'w') as outFile:
    json.dump(chunks, outFile)
