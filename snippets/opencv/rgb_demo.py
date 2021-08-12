import cv2

SHOW_DELAY_MS= 3000

img = cv2.imread("../../material/xjl.png")


print(img)
print("[[b, g , r]]")
print("img.item(1,2,0)=", img.item(1,2,0))

cv2.imshow('xjl, ', img )
cv2.waitKey(SHOW_DELAY_MS)
cv2.destroyAllWindows()
