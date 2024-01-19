
# Simulate a mechanical linkage with Position based dynamics
Mechanical linkage can be computational expensive due to having to solve a differential equation at each joints. In this project, I use a technique call "Position based dynamics", populary use in video game physics where performance is more important than accuracy, This method does not rely on differential equation to describe object motion, therefore, speed up calculation by several fold in trade of a small physical accuracy.

Position based dynamics  https://matthias-research.github.io/pages/publications/posBasedDyn.pdf

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Four Bar linkage"


## local installation

git clone https://github.com/taroandmulan/Mechanical-linkage-simulation-PBD-solver-r3f-.git

cd Mechanical-linkage-simulation-PBD-solver-r3f-

npm install

npm start




