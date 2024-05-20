
# Simulate a mechanical linkage with Position based dynamics
Mechanical linkage can be computationally expensive due to the need to solve differential equations for each joint. In this project, I use a technique called 'Position-based dynamics,' popularly used in video game physics where performance is more important than accuracy. This method does not rely on differential equations to describe object motion; therefore, it speeds up calculations by several folds at the expense of some physical accuracy.

Position based dynamics  https://matthias-research.github.io/pages/publications/posBasedDyn.pdf

## DEMO
https://mechanical-linkage-simulation-pbd-solver-r3f-myajwgsgp.vercel.app/

If the link above doesn't work (i.e. can load but white screen), then it mean that my cache file on vercel server has gone inactive. It will work again only when someone notify me and I redeployed it. Check local installation section below to see how to build it locally yourself.

Four bar 
![alt text][logo]

[logo]: https://github.com/TaroAndMulan/MechanicalLinkagePBD-react-/blob/master/public/fourbar.gif "Four Bar linkage"


Hoecken
![alt text][logo1]

[logo1]: https://github.com/TaroAndMulan/MechanicalLinkagePBD-react-/blob/master/public/houken.gif "Hoecken linkage"

3D enviroment
![alt text][logo2]

[logo2]: https://github.com/TaroAndMulan/MechanicalLinkagePBD-react-/blob/master/public/3d.gif "peaucellier linkage"



## local installation

git clone https://github.com/taroandmulan/Mechanical-linkage-simulation-PBD-solver-r3f-.git

cd Mechanical-linkage-simulation-PBD-solver-r3f-

npm install

npm start




