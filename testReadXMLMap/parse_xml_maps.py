import xml.etree.ElementTree as ET
import re
import json

textureNameToObjectTypeIds = { 
    "jelly_point.png" : 3,
    "jelly_bear_1_1.png" : 5,
    "jelly_bear_1_0.png" : 4,
    "jelly_boost.png" : 9,
    "jelly_health_2.png" : 13,
    "jelly_health_1.png" : 12,
    "jelly_coin_2.png" : 1,
    "jelly_coin_1.png" : 0,
    "jelly_magnet.png" : 8,
    "jelly_beartrans.png" : 11,
    "jelly_giganic.png" : 7,
    "jelly_abc_0.png" : 14,
    "jelly_abc_1.png" : 15,
    "jelly_abc_2.png" : 16,
    "jelly_abc_3.png" : 17,
    "jelly_abc_4.png" : 18,
    "jelly_abc_5.png" : 19,
    "jelly_abc_6.png" : 20,
    "jelly_abc_7.png" : 21,
    "jelly_abc_8.png" : 22,
    "jelly_cointrans.png" : 11,
    "jelly_fever.png" : 10,

    "m5_platform_0_0_0.png": 36,
    "m3_platform_0_0_1.png": 32,
    "m3_platform_0_0_0.png": 31,
    "m3_platform_0_0_3.png": 34,
    "m3_platform_0_0_2.png": 33,
    "m1_platform_0_0_3.png": 26,
    "m1_platform_0_0_2.png": 25,
    "m1_platform_0_0_1.png": 24,
    "m1_platform_0_0_0.png": 23,
    "m6_platform_0_0_2.png": 42,
    "m6_platform_0_0_3.png": 43,
    "m6_platform_0_0_0.png": 40,
    "m6_platform_0_0_1.png": 41,
    "m2_platform_0_0_2.png": 29,
    "m2_platform_0_0_3.png": 30,
    "m2_platform_0_0_0.png": 27,
    "m2_platform_0_0_1.png": 28,
    "m5_platform_0_0_3.png": 39,
    "m5_platform_0_0_2.png": 38,
    "m5_platform_0_0_1.png": 37,
    "m4_platform_0_0_3.png": 35,

    "m1_trap_0_0_2.png": 82,
    "m1_trap_0_0_0.png": 80,
    "m5_trap_0_0_1.png": 110,
    "m4_trap_0_0_0.png": 102,
    "m4_trap_0_0_1.png": 103,
    "m3_trap_0_1_0.png": 97,
    "m6_trap_0_1_1.png": 121,
    "m1_trap_0_1_1.png": 84,
    "m3_trap_0_0_1.png": 95,
    "m3_trap_0_0_0.png": 94,
    "m5_trap_0_1_0.png": 112,
    "m3_trap_0_0_2.png": 96,
    "m2_trap_0_1_0.png": 90,
    "m5_trap_0_2_1.png": 116,
    "m5_trap_0_2_0.png": 115,
    "m3_trap_0_2_0.png": 100,
    "m6_trap_0_0_0.png": 117,
    "m6_trap_0_2_1.png": 125,
    "m1_trap_0_2_1.png": 86,
    "m4_trap_0_1_0.png": 104,
    "m4_trap_0_1_2.png": 106,
    "m6_trap_0_1_3.png": 123,
    "m1_trap_0_1_0.png": 83,
    "m2_trap_0_0_1.png": 88,
    "m6_trap_0_1_2.png": 122,
    "m1_trap_0_0_1.png": 81,
    "m3_trap_0_2_1.png": 101,
    "m6_trap_0_0_2.png": 119,
    "m6_trap_0_0_1.png": 118,
    "m6_trap_0_2_0.png": 124,
    "m3_trap_0_1_1.png": 98,
    "m2_trap_0_0_0.png": 87,
    "m4_trap_0_2_1.png": 108,
    "m2_trap_0_1_1.png": 91,
    "m5_trap_0_0_2.png": 111,
    "m5_trap_0_0_0.png": 109,
    "m2_trap_0_2_0.png": 92,
    "m2_trap_0_2_1.png": 93,
    "m4_trap_0_1_1.png": 105,
    "m1_trap_0_2_0.png": 85,
    "m3_trap_0_1_2.png": 99,
    "m6_trap_0_1_0.png": 120,
    "m2_trap_0_0_2.png": 89,
    "m4_trap_0_2_0.png": 107,
    "m5_trap_0_1_2.png": 114,
    "m5_trap_0_1_1.png": 113
}

groundsPerChunk = 2
widthOfOneGround = 92
widthOfOneChunk = widthOfOneGround*groundsPerChunk
numOfGround = 0

chunkDatasByObjectTypeIds = {}
chunks = {}
maxXOnAllMap = 0

#read heaven maps
chunkHeight = 650
preMapWidth = 0
for mapFile in ['MAP82.xml', 'MAP83.xml']:
    tree = ET.parse(mapFile)
    root = tree.getroot()
    maxXSoFarInMap = 0
    for item in root.iter('Item'):
        textureName = item[7].text.replace("\\", "-")
        realTextureName = re.split('-', textureName)[-1]

        x = int(item[0][0].text) - 960
        y = -int(item[0][1].text) + chunkHeight
        if x > maxXSoFarInMap:
            maxXSoFarInMap = x
        x = x + preMapWidth
        if x > maxXOnAllMap:
            maxXOnAllMap = x 

        realObjectTypeId = textureNameToObjectTypeIds[realTextureName]
        if not chunkDatasByObjectTypeIds.has_key(realObjectTypeId):
             chunkDatasByObjectTypeIds[realObjectTypeId] = []
        chunkDatasByObjectTypeIds[realObjectTypeId].append({"x": x, "y" : y})

    preMapWidth = preMapWidth + maxXSoFarInMap

#save endX-1
print maxXOnAllMap
chunks['endX-1'] = maxXOnAllMap + 92
chunks['loopX-1'] = 0

#read normal maps
preMapWidth = 0
maxXOnAllMap = 0

for i in range(1, 7):
    tree = ET.parse('MAP0'+ str(i) + '.xml')
    root = tree.getroot()
    levelName =  "m" + str(i)
    maxXSoFarInMap = 0

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
        if x > maxXSoFarInMap:
            maxXSoFarInMap = x
        x = x + preMapWidth
        if x > maxXOnAllMap and realTextureName.split("_")[1] == "platform":
            maxXOnAllMap = x

        if not chunkDatasByObjectTypeIds.has_key(realObjectTypeId):
            chunkDatasByObjectTypeIds[realObjectTypeId] = []
        chunkDatasByObjectTypeIds[realObjectTypeId].append({"x": x, "y" : y})

    preMapWidth = preMapWidth + maxXSoFarInMap

#save endX-0
print maxXOnAllMap
chunks['endX-0'] = maxXOnAllMap + 92
chunks['loopX-0'] = 0

for objectTypeId in chunkDatasByObjectTypeIds.keys():
    for position in chunkDatasByObjectTypeIds[objectTypeId]:
        chunkIdX = int(position["x"]/widthOfOneChunk)
        chunkIdY = int(position["y"]/chunkHeight)
        chunkId = str(chunkIdX) + '-' + str(chunkIdY)
        if not chunks.has_key(chunkId):
            chunks[chunkId] = {}
            chunks[chunkId]['data'] = {}
        if not chunks[chunkId]['data'].has_key(objectTypeId):
             chunks[chunkId]['data'][objectTypeId] = []
        chunks[chunkId]['data'][objectTypeId].append(position)

chunkDataOutFile = "chunks.json"
with open(chunkDataOutFile, 'w') as outFile:
    json.dump(chunks, outFile)

#for key in chunkDatasByObjectTypeIds.keys():
   #print key, len(chunkDatasByObjectTypeIds[key])

#calculate the width of the map
# mapWidth = numOfGround * widthOfOneGround

# #calculate number of chunk index
# numChunkIndex = 0
# if numOfGround % groundsPerChunk == 0:
#     numChunkIndex = numOfGround / groundsPerChunk
# else:
#     numChunkIndex = numOfGround / groundsPerChunk + 1

# #prepare data for chunks to write
# chunks = {}
# minX = 0; maxX = 0
# for chunkIndex in range(0, numChunkIndex+1):
#     if chunkIndex == 0:
#         minX = 0
#         maxX = widthOfOneChunk 
#     else:
#         minX = widthOfOneChunk * chunkIndex
#         maxX = widthOfOneChunk * (chunkIndex + 1)
    
#     #add data to chunk by chunkIndex
#     chunks[chunkIndex] = {}
#     chunks[chunkIndex]['level'] = 1
#     chunks[chunkIndex]['data'] = {}
#     for objectTypeId in chunkDatasByObjectTypeIds.keys():
#         for position in chunkDatasByObjectTypeIds[objectTypeId]:
#             if minX <= position["x"] and position["x"] < maxX:
#                 if not chunks[chunkIndex]['data'].has_key(objectTypeId):
#                     chunks[chunkIndex]['data'][objectTypeId] = []
#                 chunks[chunkIndex]['data'][objectTypeId].append(position)

# chunkDataOutFile = "chunks.json"
# with open(chunkDataOutFile, 'w') as outFile:
#     json.dump(chunks, outFile)
