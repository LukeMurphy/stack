c=0
for i in *.png
do
name="head_" 
cp  "$i" "dir/$name$c.png";
c=$(($c+1)); 
done;

