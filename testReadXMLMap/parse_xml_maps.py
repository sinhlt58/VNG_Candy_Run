import xml.etree.ElementTree as ET
import re
tree = ET.parse('MAP01.xml')

root = tree.getroot()

chunkDatas = {}

for item in root.iter('Item'):
    textureName = item[7].text.replace("\\", "-")
    originX = int(item[9][0].text)
    originY = int(item[9][1].text)
    realTextureName = re.split('-', textureName)

    x = int(item[0][0].text)
    y = -int(item[0][1].text)

    if not chunkDatas.has_key(realTextureName[-1]):
        chunkDatas[realTextureName[-1]] = []

    chunkDatas[realTextureName[-1]].append((x, y)) 
    print x, y, realTextureName[-1], originX, originY

print chunkDatas["jelly_coin_1.png"]