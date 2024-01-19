
# Simulate a mechanical linkage with Position based dynamics
Mechanical linkage can be computational expensive due to having to solve differential equations for each joints. In this project, I use a technique call "Position based dynamics", populary use in video game physics where performance is more important than accuracy, This method does not rely on differential equation to describe object motion, therefore, speed up calculation by several fold in trade of a small physical accuracy.

Position based dynamics  https://matthias-research.github.io/pages/publications/posBasedDyn.pdf

Four bar 
![alt text][logo]

[logo]: https://github.com/TaroAndMulan/Mechanical-linkage-simulation-PBD-solver-r3f-/blob/master/public/fourbar.gif "Four Bar linkage"


Hoecken
![alt text][logo1]

[logo1]: https://github.com/TaroAndMulan/Mechanical-linkage-simulation-PBD-solver-r3f-/blob/master/public/houken.gif "Hoecken linkage"

3D enviroment
![alt text][logo2]

[logo2]: https://github.com/TaroAndMulan/Mechanical-linkage-simulation-PBD-solver-r3f-/blob/master/public/3d.gif "peaucellier linkage"



## local installation

git clone https://github.com/taroandmulan/Mechanical-linkage-simulation-PBD-solver-r3f-.git

cd Mechanical-linkage-simulation-PBD-solver-r3f-

npm install

npm start




