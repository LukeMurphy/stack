c=0
for i in *.png
do
name="a_"
cp  "$i" "$name$c.png";
c=$(($c+1)); 
done;

