import cv2
image_file = "../../material/lena.jpg"
print("read %s" % image_file)
lena = cv2.imread(image_file)
cv2.namedWindow("test")
cv2.imshow("test", lena)
cv2.waitKey()
cv2.destroyWindow("test")