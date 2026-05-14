import { useMemo, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ISO6391 from "iso-639-1";


const subjects = [
    { value: "physics", label: "Physics" },
    { value: "math", label: "Math" },
    { value: "chemistry", label: "Chemistry" },
    { value: "biology", label: "Biology" },
    { value: "higherMath", label: "Higher Math" },
    { value: "history", label: "History" },
];

const levels = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];

// Subtopics example per subject
const chapters = {
    physics: [
        { value: "force", label: "Force" },
        { value: "physicalQualitiesAndTheirMeasurement", label: "Physical Qualities and Their Measurement" },
        { value: "motion", label: "Motion" },
        { value: "motion", label: "Motion" },
        { value: "workPowerAndEnergy", label: "Work, Power and Energy" },
        { value: "wavesAndSound", label: "Waves and Sound" },
        { value: "reflectionOfLight", label: "Reflection of Light" },
        { value: "staticElectricity", label: "Static Electricity" },
    ],
    math: [
        { value: "realNumbers", label: "Real Numbers" },
        { value: "setsAndFunctions", label: "Sets and Functions" },
        { value: "algebraicExpressions", label: "Algebraic Expressions" },
        { value: "exponentsAndLogarithms", label: "Exponents and Logarithms" },
        { value: "equationsInOneVariable", label: "Equations in One Variable" },
        { value: "linesAnglesAndTriangles", label: "Lines, Angles and Triangles" },
        { value: "practicalGeometry", label: "Practical Geometry" },
        { value: "circle", label: "Circle" },
        { value: "trigonometricRatio", label: "Trigonometric Ratio" },
        { value: "distanceAndElevation", label: "Distance and Elevation" },
        { value: "algebraicRatioAndProportion", label: "Algebraic Ratio and Proportion" },
        { value: "simpleSimultaneousEquations", label: "Simple Simultaneous Equations in Two Variables" },
        { value: "finiteSeries", label: "Finite Series" },
        { value: "ratioSimilarityAndSymmetry", label: "Ratio, Similarity and Symmetry" },
        { value: "areaRelatedTheoremsAndConstructions", label: "Area Related Theorems and Constructions" },
        { value: "mensuration", label: "Mensuration" },
        { value: "statistics", label: "Statistics" }
    ],
    chemistry: [
        { value: "conceptsOfChemistry", label: "Concepts of Chemistry" },
        { value: "statesOfMatter", label: "States of Matter" },
        { value: "structureOfMatter", label: "Structure of Matter" },
        { value: "periodicTable", label: "Periodic Table" },
        { value: "chemicalBond", label: "Chemical Bond" },
        { value: "conceptOfMole", label: "Concept of Mole and Chemical Counting" },
        { value: "chemicalReactions", label: "Chemical Reactions" },
        { value: "chemistryAndEnergy", label: "Chemistry and Energy" },
        { value: "acidBaseBalance", label: "Acid - Base Balance" },
        { value: "mineralResourcesMetals", label: "Mineral Resources: Metal - Nonmetal" },
        { value: "mineralResourcesFossils", label: "Mineral Resources: Fossils" },
        { value: "chemistryInOurLives", label: "Chemistry in Our Lives" }
    ],
    biology: [
        { value: "lessonsOnLife", label: "Lessons on Life" },
        { value: "cellsAndTissues", label: "Cells and Tissues of Organisms" },
        { value: "cellDivision", label: "Cell Division" },
        { value: "bioenergetics", label: "Bioenergetics" },
        { value: "foodNutritionAndDigestion", label: "Food, Nutrition and Digestion" },
        { value: "transportInOrganisms", label: "Transport in Organisms" },
        { value: "exchangeOfGases", label: "Exchange of Gases" },
        { value: "excretorySystem", label: "Excretory System" },
        { value: "firmnessAndLocomotion", label: "Firmness and Locomotion" },
        { value: "coordination", label: "Co-ordination" },
        { value: "reproductionInOrganisms", label: "Reproduction in Organism" },
        { value: "heredityAndEvolution", label: "Heredity in Organisms and Biological Evolution" },
        { value: "environmentOfLife", label: "Environment of Life" },
        { value: "biotechnology", label: "Biotechnology" }
    ],
    higherMath: [
        { value: "setAndFunction", label: "Set and Function" },
        { value: "algebraicExpression", label: "Algebraic Expression" },
        { value: "geometry", label: "Geometry" },
        { value: "geometricConstructions", label: "Geometric Constructions" },
        { value: "equation", label: "Equation" },
        { value: "inequality", label: "Inequality" },
        { value: "infiniteSeries", label: "Infinite Series" },
        { value: "trigonometry", label: "Trigonometry" },
        { value: "exponentialAndLogarithmicFunction", label: "Exponential and Logarithmic Function" },
        { value: "binomialExpansion", label: "Binomial Expansion" },
        { value: "coordinateGeometry", label: "Coordinate Geometry" },
        { value: "planarVector", label: "Planar Vector" },
        { value: "solidGeometry", label: "Solid Geometry" },
        { value: "probability", label: "Probability" }
    ],
    history: [
        { value: "british", label: "British" },
        { value: "mughal", label: "Mughal" },
        { value: "babylon", label: "Babylon" },
        { value: "bangladesh-liberation-war", label: "Bangladesh liberation war" },
    ],
};

// sub topics list based on chapter and subject
const subtopics = {
    physics: {
        force: [
            { value: "newtons-first-law", label: "Newton's First Law" },
            { value: "newtons-second-law", label: "Newton's Second Law" },
            { value: "newtons-third-law", label: "Newton's Third Law" },
            { value: "balanced-and-unbalanced-force", label: "Balanced and Unbalanced Force" },
            { value: "friction", label: "Friction" },
            { value: "mass-and-weight", label: "Mass and Weight" },
            { value: "momentum", label: "Momentum" },
            { value: "impulse", label: "Impulse" },
            { value: "centripetal-force", label: "Centripetal Force" },
        ],

        physicalQualitiesAndTheirMeasurement: [
            { value: "physical-quantities", label: "Physical Quantities" },
            { value: "fundamental-quantities", label: "Fundamental Quantities" },
            { value: "derived-quantities", label: "Derived Quantities" },
            { value: "units-and-measurement", label: "Units and Measurement" },
            { value: "si-units", label: "SI Units" },
            { value: "measuring-instruments", label: "Measuring Instruments" },
            { value: "least-count", label: "Least Count" },
            { value: "measurement-errors", label: "Measurement Errors" },
            { value: "scientific-notation", label: "Scientific Notation" },
        ],

        motion: [
            { value: "distance-and-displacement", label: "Distance and Displacement" },
            { value: "speed-and-velocity", label: "Speed and Velocity" },
            { value: "uniform-motion", label: "Uniform Motion" },
            { value: "non-uniform-motion", label: "Non-uniform Motion" },
            { value: "acceleration", label: "Acceleration" },
            { value: "equations-of-motion", label: "Equations of Motion" },
            { value: "graphs-of-motion", label: "Graphs of Motion" },
            { value: "free-fall", label: "Free Fall" },
            { value: "projectile-motion", label: "Projectile Motion" },
        ],

        workPowerAndEnergy: [
            { value: "work", label: "Work" },
            { value: "power", label: "Power" },
            { value: "energy", label: "Energy" },
            { value: "kinetic-energy", label: "Kinetic Energy" },
            { value: "potential-energy", label: "Potential Energy" },
            { value: "law-of-conservation-of-energy", label: "Law of Conservation of Energy" },
            { value: "mechanical-energy", label: "Mechanical Energy" },
            { value: "efficiency", label: "Efficiency" },
        ],

        wavesAndSound: [
            { value: "wave", label: "Wave" },
            { value: "types-of-waves", label: "Types of Waves" },
            { value: "sound", label: "Sound" },
            { value: "properties-of-sound", label: "Properties of Sound" },
            { value: "echo", label: "Echo" },
            { value: "noise-pollution", label: "Noise Pollution" },
            { value: "frequency-and-time-period", label: "Frequency and Time Period" },
            { value: "amplitude", label: "Amplitude" },
            { value: "velocity-of-sound", label: "Velocity of Sound" },
        ],

        reflectionOfLight: [
            { value: "reflection", label: "Reflection" },
            { value: "laws-of-reflection", label: "Laws of Reflection" },
            { value: "plane-mirror", label: "Plane Mirror" },
            { value: "concave-mirror", label: "Concave Mirror" },
            { value: "convex-mirror", label: "Convex Mirror" },
            { value: "image-formation", label: "Image Formation" },
            { value: "ray-diagram", label: "Ray Diagram" },
            { value: "multiple-reflection", label: "Multiple Reflection" },
        ],

        staticElectricity: [
            { value: "electric-charge", label: "Electric Charge" },
            { value: "types-of-charge", label: "Types of Charge" },
            { value: "charging-by-friction", label: "Charging by Friction" },
            { value: "electroscope", label: "Electroscope" },
            { value: "conductors-and-insulators", label: "Conductors and Insulators" },
            { value: "lightning", label: "Lightning" },
            { value: "earthing", label: "Earthing" },
            { value: "coulombs-law", label: "Coulomb's Law" },
        ],
    },
    math: {
        realNumbers: [
            { value: "classificationOfRealNumbers", label: "Classification of Real Numbers" },
            { value: "naturalNumbers", label: "Natural Numbers" },
            { value: "integers", label: "Integers" },
            { value: "fractionalNumbers", label: "Fractional Numbers" },
            { value: "rationalNumbers", label: "Rational Numbers" },
            { value: "irrationalNumbers", label: "Irrational Numbers" },
            { value: "propertiesOfRealNumbers", label: "Properties of Real Numbers" },
            { value: "decimalFractions", label: "Decimal Fractions" },
            { value: "finiteDecimalFractions", label: "Finite Decimal Fractions" },
            { value: "repeatingDecimalFractions", label: "Repeating Decimal Fractions" },
            { value: "infiniteDecimalFractions", label: "Infinite Decimal Fractions" },
            { value: "convertingRepeatingDecimals", label: "Converting Repeating Decimals to Fractions" },
            { value: "similarDissimilarRepeatingFractions", label: "Similar and Dissimilar Repeating Fractions" },
            { value: "operationsOnRepeatingDecimals", label: "Operations on Repeating Decimals" },
            { value: "approximateValues", label: "Approximate Values" }
        ],

        setsAndFunctions: [
            { value: "sets", label: "Sets" },
            { value: "rosterMethod", label: "Roster Method" },
            { value: "setBuilderMethod", label: "Set Builder Method" },
            { value: "finiteAndInfiniteSets", label: "Finite and Infinite Sets" },
            { value: "emptySet", label: "Empty Set" },
            { value: "vennDiagrams", label: "Venn Diagrams" },
            { value: "subsets", label: "Subsets" },
            { value: "properSubsets", label: "Proper Subsets" },
            { value: "equivalentSets", label: "Equivalent Sets" },
            { value: "differenceOfSets", label: "Difference of Sets" },
            { value: "universalSet", label: "Universal Set" },
            { value: "complementOfSet", label: "Complement of a Set" },
            { value: "unionOfSets", label: "Union of Sets" },
            { value: "intersectionOfSets", label: "Intersection of Sets" },
            { value: "disjointSets", label: "Disjoint Sets" },
            { value: "powerSets", label: "Power Sets" },
            { value: "orderedPairs", label: "Ordered Pairs" },
            { value: "cartesianProduct", label: "Cartesian Product" },
            { value: "relations", label: "Relations" }
        ],

        algebraicExpressions: [
            { value: "algebraicExpressions", label: "Algebraic Expressions" },
            { value: "polynomials", label: "Polynomials" },
            { value: "additionSubtractionOfPolynomials", label: "Addition and Subtraction of Polynomials" },
            { value: "multiplicationOfPolynomials", label: "Multiplication of Polynomials" },
            { value: "divisionOfPolynomials", label: "Division of Polynomials" },
            { value: "factorization", label: "Factorization" },
            { value: "algebraicIdentities", label: "Algebraic Identities" }
        ],

        exponentsAndLogarithms: [
            { value: "exponents", label: "Exponents" },
            { value: "lawsOfExponents", label: "Laws of Exponents" },
            { value: "logarithms", label: "Logarithms" },
            { value: "lawsOfLogarithms", label: "Laws of Logarithms" }
        ],

        equationsInOneVariable: [
            { value: "linearEquations", label: "Linear Equations in One Variable" },
            { value: "solvingEquations", label: "Solving Equations" },
            { value: "wordProblemsOnEquations", label: "Word Problems on Equations" }
        ],

        linesAnglesAndTriangles: [
            { value: "linesAndAngles", label: "Lines and Angles" },
            { value: "triangles", label: "Triangles" },
            { value: "angleSumProperty", label: "Angle Sum Property of Triangle" },
            { value: "congruentTriangles", label: "Congruent Triangles" }
        ],

        practicalGeometry: [
            { value: "constructionOfTriangles", label: "Construction of Triangles" },
            { value: "constructionOfQuadrilaterals", label: "Construction of Quadrilaterals" }
        ],

        circle: [
            { value: "basicConceptsOfCircle", label: "Basic Concepts of Circle" },
            { value: "circleTheorems", label: "Circle Theorems" },
            { value: "cyclicQuadrilaterals", label: "Cyclic Quadrilaterals" }
        ],

        trigonometricRatio: [
            { value: "trigonometricRatios", label: "Trigonometric Ratios" },
            { value: "trigonometricIdentities", label: "Trigonometric Identities" },
            { value: "trigonometricValues", label: "Trigonometric Values of Standard Angles" }
        ],

        distanceAndElevation: [
            { value: "angleOfElevation", label: "Angle of Elevation" },
            { value: "angleOfDepression", label: "Angle of Depression" },
            { value: "heightAndDistanceProblems", label: "Problems on Height and Distance" }
        ],

        algebraicRatioAndProportion: [
            { value: "ratioAndProportion", label: "Ratio and Proportion" },
            { value: "continuedProportion", label: "Continued Proportion" },
            { value: "variation", label: "Variation" }
        ],

        simpleSimultaneousEquations: [
            { value: "simultaneousEquations", label: "Simultaneous Equations" },
            { value: "eliminationMethod", label: "Elimination Method" },
            { value: "substitutionMethod", label: "Substitution Method" }
        ],

        finiteSeries: [
            { value: "arithmeticSeries", label: "Arithmetic Series" },
            { value: "geometricSeries", label: "Geometric Series" },
            { value: "sumOfFiniteSeries", label: "Sum of Finite Series" }
        ],

        ratioSimilarityAndSymmetry: [
            { value: "ratioAndSimilarity", label: "Ratio and Similarity" },
            { value: "similarTriangles", label: "Similar Triangles" },
            { value: "symmetry", label: "Symmetry" }
        ],

        areaRelatedTheoremsAndConstructions: [
            { value: "pythagorasTheorem", label: "Pythagoras Theorem" },
            { value: "areaRelatedTheorems", label: "Area Related Theorems" },
            { value: "constructions", label: "Constructions" }
        ],

        mensuration: [
            { value: "areaAndPerimeter", label: "Area and Perimeter" },
            { value: "volumeAndSurfaceArea", label: "Volume and Surface Area" },
            { value: "cylinderConeSphere", label: "Cylinder, Cone and Sphere" }
        ],

        statistics: [
            { value: "dataRepresentation", label: "Data Representation" },
            { value: "meanMedianMode", label: "Mean, Median and Mode" },
            { value: "frequencyDistribution", label: "Frequency Distribution" }
        ]
    },
    chemistry: {
        conceptsOfChemistry: [
            { value: "introductionToChemistry", label: "Introduction to Chemistry" },
            { value: "scopesOfChemistry", label: "Scopes of Chemistry" },
            { value: "relationshipWithOtherSciences", label: "Relationship with Other Branches of Science" },
            { value: "importanceOfChemistry", label: "Importance of Studying Chemistry" },
            { value: "researchProcessInChemistry", label: "Process of Research in Chemistry" },
            { value: "safetyMeasuresInLab", label: "Safety Measures in Chemistry Laboratory" },
            { value: "hazardSymbols", label: "Hazard Symbols and Precautions" }
        ],

        statesOfMatter: [
            { value: "statesOfMatter", label: "States of Matter (Solid, Liquid, Gas)" },
            { value: "kineticTheoryOfParticles", label: "Kinetic Theory of Particles" },
            { value: "diffusion", label: "Diffusion" },
            { value: "effusion", label: "Effusion" },
            { value: "meltingAndBoiling", label: "Melting and Boiling" },
            { value: "meltingPointAndBoilingPoint", label: "Melting Point and Boiling Point" },
            { value: "heatingAndCoolingCurve", label: "Heating and Cooling Curve" }
        ],

        structureOfMatter: [
            { value: "atomicStructure", label: "Structure of Atom" },
            { value: "electronConfiguration", label: "Electron Configuration" },
            { value: "quantumNumbers", label: "Quantum Numbers" },
            { value: "periodicTableIntroduction", label: "Introduction to Periodic Table" }
        ],

        periodicTable: [
            { value: "periodicTable", label: "Periodic Table" },
            { value: "periodicTrends", label: "Periodic Trends" },
            { value: "groupsAndPeriods", label: "Groups and Periods" },
            { value: "propertiesOfElements", label: "Properties of Elements" }
        ],

        chemicalBond: [
            { value: "chemicalBond", label: "Chemical Bond" },
            { value: "ionicBond", label: "Ionic Bond" },
            { value: "covalentBond", label: "Covalent Bond" },
            { value: "metallicBond", label: "Metallic Bond" },
            { value: "bondProperties", label: "Properties of Bonds" }
        ],

        conceptOfMole: [
            { value: "moleConcept", label: "Concept of Mole" },
            { value: "molarMass", label: "Molar Mass" },
            { value: "chemicalCalculations", label: "Chemical Calculations" },
            { value: "percentageComposition", label: "Percentage Composition" },
            { value: "empiricalAndMolecularFormula", label: "Empirical and Molecular Formula" }
        ],

        chemicalReactions: [
            { value: "chemicalReactions", label: "Chemical Reactions" },
            { value: "typesOfReactions", label: "Types of Chemical Reactions" },
            { value: "balancingEquations", label: "Balancing Chemical Equations" },
            { value: "stoichiometry", label: "Stoichiometry" }
        ],

        chemistryAndEnergy: [
            { value: "chemicalEnergy", label: "Chemical Energy" },
            { value: "exothermicAndEndothermic", label: "Exothermic and Endothermic Reactions" },
            { value: "heatOfReaction", label: "Heat of Reaction" },
            { value: "fuelAndCombustion", label: "Fuel and Combustion" }
        ],

        acidBaseBalance: [
            { value: "acidsAndBases", label: "Acids and Bases" },
            { value: "phScale", label: "pH Scale" },
            { value: "neutralization", label: "Neutralization Reaction" },
            { value: "acidBaseIndicators", label: "Acid-Base Indicators" },
            { value: "salts", label: "Salts" }
        ],

        mineralResourcesMetals: [
            { value: "metalsAndNonmetals", label: "Metals and Non-metals" },
            { value: "extractionOfMetals", label: "Extraction of Metals" },
            { value: "propertiesOfMetals", label: "Properties and Uses of Metals" }
        ],

        mineralResourcesFossils: [
            { value: "fossilFuels", label: "Fossil Fuels" },
            { value: "coalAndPetroleum", label: "Coal and Petroleum" },
            { value: "naturalGas", label: "Natural Gas" }
        ],

        chemistryInOurLives: [
            { value: "chemistryInDailyLife", label: "Chemistry in Daily Life" },
            { value: "environmentalChemistry", label: "Environmental Chemistry" },
            { value: "polymersAndPlastics", label: "Polymers and Plastics" },
            { value: "agriculturalChemistry", label: "Agricultural Chemistry" },
            { value: "medicinalChemistry", label: "Medicinal Chemistry" }
        ]
    },
    biology: {
        lessonsOnLife: [
            { value: "conceptOfBiology", label: "Concept of Biology" },
            { value: "branchesOfBiology", label: "Branches of Biology" },
            { value: "classificationOfOrganisms", label: "Classification of Organisms" },
            { value: "fiveKingdomClassification", label: "Five Kingdom Classification" },
            { value: "taxonomicHierarchy", label: "Taxonomic Hierarchy" },
            { value: "binomialNomenclature", label: "Binomial Nomenclature" }
        ],

        cellsAndTissues: [
            { value: "prokaryoticAndEukaryoticCells", label: "Prokaryotic and Eukaryotic Cells" },
            { value: "cellOrganelles", label: "Cell Organelles and Their Functions" },
            { value: "plantCellVsAnimalCell", label: "Plant Cell vs Animal Cell" },
            { value: "plantTissues", label: "Plant Tissues" },
            { value: "animalTissues", label: "Animal Tissues" },
            { value: "cellToOrganSystem", label: "Organisation from Cell to Organ System" }
        ],

        cellDivision: [
            { value: "mitosis", label: "Mitosis" },
            { value: "meiosis", label: "Meiosis" },
            { value: "cellCycle", label: "Cell Cycle" }
        ],

        bioenergetics: [
            { value: "photosynthesis", label: "Photosynthesis" },
            { value: "cellularRespiration", label: "Cellular Respiration" },
            { value: "energyFlow", label: "Energy Flow in Living Organisms" }
        ],

        foodNutritionAndDigestion: [
            { value: "nutritionTypes", label: "Types of Nutrition" },
            { value: "humanDigestiveSystem", label: "Human Digestive System" },
            { value: "digestionProcess", label: "Digestion and Absorption" },
            { value: "balancedDiet", label: "Balanced Diet" }
        ],

        transportInOrganisms: [
            { value: "transportInPlants", label: "Transport in Plants" },
            { value: "humanCirculatorySystem", label: "Human Circulatory System" },
            { value: "bloodAndLymph", label: "Blood and Lymph" }
        ],

        exchangeOfGases: [
            { value: "respiratorySystem", label: "Respiratory System" },
            { value: "gasExchangeInHumans", label: "Gas Exchange in Humans" },
            { value: "breathingMechanism", label: "Breathing Mechanism" }
        ],

        excretorySystem: [
            { value: "excretionInPlants", label: "Excretion in Plants" },
            { value: "humanExcretorySystem", label: "Human Excretory System" },
            { value: "kidneyStructureAndFunction", label: "Kidney Structure and Function" }
        ],

        firmnessAndLocomotion: [
            { value: "skeletalSystem", label: "Skeletal System" },
            { value: "muscularSystem", label: "Muscular System" },
            { value: "locomotionInHumans", label: "Locomotion in Humans" }
        ],

        coordination: [
            { value: "nervousSystem", label: "Nervous System" },
            { value: "endocrineSystem", label: "Endocrine System" },
            { value: "hormones", label: "Hormones and Their Functions" }
        ],

        reproductionInOrganisms: [
            { value: "asexualReproduction", label: "Asexual Reproduction" },
            { value: "sexualReproduction", label: "Sexual Reproduction" },
            { value: "humanReproductiveSystem", label: "Human Reproductive System" }
        ],

        heredityAndEvolution: [
            { value: "heredity", label: "Heredity" },
            { value: "mendelsLaws", label: "Mendel's Laws of Inheritance" },
            { value: "biologicalEvolution", label: "Biological Evolution" }
        ],

        environmentOfLife: [
            { value: "ecosystem", label: "Ecosystem" },
            { value: "foodChainAndFoodWeb", label: "Food Chain and Food Web" },
            { value: "biodiversity", label: "Biodiversity and Conservation" },
            { value: "environmentalIssues", label: "Environmental Issues" }
        ],

        biotechnology: [
            { value: "introductionToBiotechnology", label: "Introduction to Biotechnology" },
            { value: "geneticEngineering", label: "Genetic Engineering" },
            { value: "applicationsOfBiotechnology", label: "Applications of Biotechnology" }
        ]
    },
    higherMath: {
        setAndFunction: [
            { value: "setConcept", label: "Set Concept" },
            { value: "universalSet", label: "Universal Set" },
            { value: "subsets", label: "Subsets and Proper Subsets" },
            { value: "setOperations", label: "Union, Intersection, Difference and Complement" },
            { value: "vennDiagram", label: "Venn Diagram" },
            { value: "powerSet", label: "Power Set" },
            { value: "cartesianProduct", label: "Cartesian Product" },
            { value: "relations", label: "Relations" },
            { value: "functions", label: "Functions" },
            { value: "domainAndRange", label: "Domain and Range" },
            { value: "oneOneOntoFunctions", label: "One-One and Onto Functions" },
            { value: "inverseFunction", label: "Inverse Function" }
        ],

        algebraicExpression: [
            { value: "polynomials", label: "Polynomials" },
            { value: "algebraicIdentities", label: "Algebraic Identities" },
            { value: "factorization", label: "Factorization" },
            { value: "algebraicFractions", label: "Algebraic Fractions" }
        ],

        geometry: [
            { value: "linesAndAngles", label: "Lines and Angles" },
            { value: "triangles", label: "Triangles" },
            { value: "circleTheorems", label: "Circle Theorems" },
            { value: "quadrilaterals", label: "Quadrilaterals" }
        ],

        geometricConstructions: [
            { value: "basicConstructions", label: "Basic Geometric Constructions" },
            { value: "triangleConstruction", label: "Construction of Triangles" },
            { value: "circleConstruction", label: "Construction Related to Circles" }
        ],

        equation: [
            { value: "linearEquations", label: "Linear Equations" },
            { value: "quadraticEquations", label: "Quadratic Equations" },
            { value: "simultaneousEquations", label: "Simultaneous Equations" }
        ],

        inequality: [
            { value: "linearInequalities", label: "Linear Inequalities" },
            { value: "quadraticInequalities", label: "Quadratic Inequalities" },
            { value: "inequalitiesInTwoVariables", label: "Inequalities in Two Variables" }
        ],

        infiniteSeries: [
            { value: "sequenceAndSeries", label: "Sequence and Series" },
            { value: "arithmeticSeries", label: "Arithmetic Series" },
            { value: "geometricSeries", label: "Geometric Series" },
            { value: "infiniteGeometricSeries", label: "Infinite Geometric Series" }
        ],

        trigonometry: [
            { value: "trigonometricRatios", label: "Trigonometric Ratios" },
            { value: "trigonometricIdentities", label: "Trigonometric Identities" },
            { value: "trigonometricFunctions", label: "Trigonometric Functions" },
            { value: "heightAndDistance", label: "Height and Distance" }
        ],

        exponentialAndLogarithmicFunction: [
            { value: "exponentialFunctions", label: "Exponential Functions" },
            { value: "logarithmicFunctions", label: "Logarithmic Functions" },
            { value: "lawsOfLogarithms", label: "Laws of Logarithms" }
        ],

        binomialExpansion: [
            { value: "binomialTheorem", label: "Binomial Theorem" },
            { value: "binomialExpansionForPositiveInteger", label: "Binomial Expansion for Positive Integer" }
        ],

        coordinateGeometry: [
            { value: "distanceFormula", label: "Distance Formula" },
            { value: "sectionFormula", label: "Section Formula" },
            { value: "straightLineEquation", label: "Equation of Straight Line" },
            { value: "circleEquation", label: "Equation of Circle" }
        ],

        planarVector: [
            { value: "vectorConcept", label: "Vector Concept" },
            { value: "vectorAddition", label: "Vector Addition and Subtraction" },
            { value: "scalarProduct", label: "Scalar Product" }
        ],

        solidGeometry: [
            { value: "solidFigures", label: "Solid Figures" },
            { value: "volumeAndSurfaceArea", label: "Volume and Surface Area" }
        ],

        probability: [
            { value: "probabilityConcept", label: "Probability Concept" },
            { value: "theoreticalProbability", label: "Theoretical Probability" },
            { value: "eventAndOutcome", label: "Event and Outcome" }
        ]
    }
};

// data of type of question user want
const questionTypes = [
    { value: "mcq", label: "Multiple Choice Questions" },
    { value: "SQ", label: "Short Questions of 2 marks" },
    { value: "LQ", label: "Long Questions of 3 and 4 marks" },
    { value: "critical-thinking", label: "Critical Thinking Questions" },
    { value: "definition", label: "Definition Based Questions" },
    { value: "theory", label: "Theory Based Questions" },
    { value: "numerical", label: "Numerical Questions" },
    { value: "criticalNumerical", label: "Critical Numerical Questions" }
];


function LanguageSelector({ onChange }) {
    const [value, setValue] = useState(null);

    // build languages once
    const allLanguages = useMemo(
        () =>
            ISO6391.getAllNames().map((name) => ({
                value: ISO6391.getCode(name), // e.g. "en"
                label: name,                  // e.g. "English"
            })),
        []
    );

    const defaultOptions = useMemo(() => allLanguages.slice(0, 50), [allLanguages]);

    // loadOptions can use callback OR return a Promise
    const loadOptions = (inputValue, callback) => {
        // if no input, show defaults
        if (!inputValue) {
            callback(defaultOptions);
            return;
        }

        const q = inputValue.trim().toLowerCase();

        // simple substring filter (fast). For fuzzy matching, integrate fuse.js.
        const filtered = allLanguages.filter((lang) =>
            lang.label.toLowerCase().includes(q) || (lang.value && lang.value.includes(q))
        );

        // return via callback
        callback(filtered);
        // OR return Promise.resolve(filtered)
    };

    const handleChange = (selected) => {
        setValue(selected);
        if (onChange) onChange(selected);
    };

    return (
        <div className="mb-4 full">
            <label className="block mb-2 font-medium">Language</label>
            < AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={defaultOptions}
                value={value}
                onChange={handleChange}
                placeholder="Search and select language..."
                isClearable
            />
        </div>
    );
};

const languages = [
    { value: "english", label: "English" },
    { value: "bangla", label: "Bangla" },
];

const QuestionForm = ({ handleSubmit, retryAfter, isPending }) => {
    const [subject, setSubject] = useState(null);
    const [level, setLevel] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [language, setLanguage] = useState(null);
    const [type, setType] = useState(null);
    const [subTopic, setSubTopic] = useState(null);
    const isDisabled = !subject || !level || !chapter || isPending || retryAfter > 0
    // console.log(language, subject)
    return (
        <div className="w-full mx-auto mt-5 p-6 bg-white shadow-lg rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Subjects */}
            <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Subject</label>
                <Select
                    options={subjects}
                    value={subject}
                    onChange={setSubject}
                    placeholder="Select subject..."
                />
            </div>

            {/* Levels -- easy,hard, medium */}
            <div className="mb-4 w-full">
                <label className="block mb-2 font-medium">Level</label>
                <Select
                    options={levels}
                    value={level}
                    onChange={setLevel}
                    placeholder="Select difficulty level..."
                />
            </div>

            {/* Chapter */}
            <div className="mb-4 full">
                <label className="block mb-2 font-medium">Chapter</label>
                <Select
                    options={subject ? chapters[subject.value] : []}
                    value={chapter}
                    onChange={setChapter}
                    placeholder={subject ? "Select chapter..." : "Select a subject first"}
                    isDisabled={!subject}
                />
            </div>

            {/* sub topic */}
            <div className="mb-4 full">
                <label className="block mb-2 font-medium">Sub Topic</label>
                <Select
                    options={chapter ? subtopics[subject.value][chapter.value] : []}
                    value={subTopic}
                    onChange={setSubTopic}
                    placeholder={chapter ? "Select sub topic..." : "Select a chapter first"}
                    isDisabled={!chapter}
                />
            </div>

            {/* Question Type */}
            <div className="mb-4 full">
                <label className="block mb-2 font-medium">Question Type</label>
                <Select
                    options={questionTypes}
                    value={type}
                    onChange={setType}
                    placeholder="Select question type..."
                />
            </div>

            {/* <LanguageSelector onChange={setLanguages} /> */}
            {/* language */}
            <div className="mb-4 full">
                <label className="block mb-2 font-medium">Language</label>
                <Select
                    options={languages}
                    value={language}
                    onChange={setLanguage}
                    placeholder={subject ? "Select language ..." : "Select a subject first"}
                />
            </div>

            <button
                className={`w-64 bg-secondary font-bold py-2 px-4 rounded text-black transition 
                       ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                onClick={() => handleSubmit(subject, chapter, level, subTopic, type, language)}
            // disabled={isDisabled}
            >
                {retryAfter > 0 ?
                    <span>retry after {retryAfter} seconds</span>
                    :
                    <span>Generate Questions</span>
                }
            </button>
        </div>
    );
};

export default QuestionForm;
