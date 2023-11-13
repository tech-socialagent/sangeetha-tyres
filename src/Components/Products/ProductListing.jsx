import React, { useEffect, useState } from 'react';
import styles from '@/styles/Products/Product.module.css';
import db from '../../FirebaseConfig';
import Card from './Card/Card';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { AiFillCloseCircle, AiFillPlusCircle } from 'react-icons/ai';
import { LuFilter } from 'react-icons/lu'
import { GrFormClose } from 'react-icons/gr'
import { useRouter } from 'next/router';

const ProductListing = () => {
    const [data, setData] = useState([]);
    const [expandedFilters, setExpandedFilters] = useState([]);
    const [selectedTyreBrands, setSelectedTyreBrands] = useState([]);
    const [selectedVehicleBrands, setSelectedVehicleBrands] = useState([]);
    const [selectedTyreAspects, setSelectedTyreAspects] = useState([]);
    const [selectedTyreWidths, setSelectedTyreWidths] = useState([]);
    const [selectedTyreTypes, setSelectedTyreTypes] = useState([]);
    const [selectedTyreSizes, setSelectedTyreSizes] = useState([]);
    const [selectedTyrePatterns, setSelectedTyrePatterns] = useState([]);
    const [selectedTyreRim, setSelectedTyreRim] = useState([]);

    const [mobileFilter, setMobileFilter] = useState(false)
    const router = useRouter();
    // const tyreBrandParam = router.query.tyreBrand;

    const { tyreBrandParam, widthParam, sizeParam, rimParam } = router.query;


    const readData = async () => {
        let array = [];
        let q = collection(db, 'products');

        // Apply the filter condition for selected Tyre Brands
        if (selectedTyreBrands.length > 0) {
            q = query(q, where('status', '==', 'Active'), where('tyreBrand', 'in', selectedTyreBrands));
        } else {
            q = query(q, where('status', '==', 'Active'));
        }

        // Apply the filter condition for selected Vehicle Types
        if (selectedVehicleBrands.length > 0) {
            q = query(q, where('vehicleType', 'in', selectedVehicleBrands));
        }

        if (selectedTyreAspects.length > 0) {
            q = query(q, where('tyreAspect', 'in', selectedTyreAspects));
        }
        if (selectedTyreWidths.length > 0) {
            q = query(q, where('tyreWidth', 'in', selectedTyreWidths));
        }
        if (selectedTyreTypes.length > 0) {
            q = query(q, where('tyreType', 'in', selectedTyreTypes));
        }
        if (selectedTyreSizes.length > 0) {
            q = query(q, where('tyreSize', 'in', selectedTyreSizes));
        }
        if (selectedTyrePatterns.length > 0) {
            q = query(q, where('tyrePattern', 'in', selectedTyrePatterns));
        }
        if (selectedTyreRim.length > 0) {
            q = query(q, where('tyreRim', 'in', selectedTyreRim));
        }

        // Apply other filters based on URL parameters
        if (tyreBrandParam) {
            q = query(q, where('tyreBrand', '==', tyreBrandParam));
            // setSelectedTyreBrands(tyreBrand)
        }
        if (widthParam) {
            q = query(q, where('tyreWidth', '==', widthParam));
        }
        if (sizeParam) {
            q = query(q, where('tyreSize', '==', sizeParam));
        }
        if (rimParam) {
            q = query(q, where('tyreRim', '==', rimParam));
            // setSelectedTyreRim(rim)
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push(doc.data());
        });
        setData(array);
    };


    useEffect(() => {
        readData();
    }, [selectedTyreBrands, selectedVehicleBrands, selectedTyreAspects, selectedTyreWidths, selectedTyreTypes, selectedTyreSizes, selectedTyrePatterns, selectedTyreRim]);

    const [tyreBrand, setTyreBrand] = useState([]);
    const [vehicleType, setVehicleType] = useState([]);
    const [tyreRim, setTyreRim] = useState([]);
    const [tyrePattern, setTyrePattern] = useState([]);
    const [tyreSize, setTyreSize] = useState([]);
    const [tyreType, setTyreType] = useState([]);
    const [tyreWidth, setTyreWidth] = useState([]);
    const [tyreAspect, setTyreAspect] = useState([]);

    useEffect(() => {
        const getData = async (collectionName) => {
            const q = collection(db, collectionName);
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const array = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().value !== 'null') {
                        array.push(doc.data());
                    }
                });
                switch (collectionName) {
                    case 'TyreBrands':
                        setTyreBrand(array);
                        break;
                    case 'VehicleType':
                        setVehicleType(array);
                        break;
                    case 'TyreRim':
                        setTyreRim(array);
                        break;
                    case 'TyrePattern':
                        setTyrePattern(array);
                        break;
                    case 'TyreSize':
                        setTyreSize(array);
                        break;
                    case 'TyreType':
                        setTyreType(array);
                        break;
                    case 'TyreWidth':
                        setTyreWidth(array);
                        break;
                    case 'TyreAspect':
                        setTyreAspect(array);
                        break;
                    default:
                        break;
                }
            });
        };

        getData('TyreBrands');
        getData('VehicleType');
        getData('TyreRim');
        getData('TyrePattern');
        getData('TyreSize');
        getData('TyreType');
        getData('TyreWidth');
        getData('TyreAspect');
    }, []);

    const toggleFilter = (filterTitle) => {
        setExpandedFilters((prevFilters) => {
            if (prevFilters.includes(filterTitle)) {
                return prevFilters.filter((title) => title !== filterTitle);
            } else {
                return [...prevFilters, filterTitle];
            }
        });
    };

    const handleTyreBrandChange = (brand) => {
        setSelectedTyreBrands((prevSelectedBrands) => {
            if (prevSelectedBrands.includes(brand)) {
                return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand);
            } else {
                return [...prevSelectedBrands, brand];
            }
        });
    };

    const handleVehicleTypeChange = (value) => {
        console.log("value", value);
        setSelectedVehicleBrands((prevSelectedBrands) => {
            if (prevSelectedBrands.includes(value)) {
                return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== value);
            } else {
                return [...prevSelectedBrands, value];
            }
        });
    };

    const handleTyreAspectChange = (value) => {
        setSelectedTyreAspects((prevSelectedAspects) => {
            if (prevSelectedAspects.includes(value)) {
                return prevSelectedAspects.filter((selectedAspect) => selectedAspect !== value);
            } else {
                return [...prevSelectedAspects, value];
            }
        });
    };

    const handleTyreWidthChange = (value) => {
        setSelectedTyreWidths((prevSelectedWidths) => {
            if (prevSelectedWidths.includes(value)) {
                return prevSelectedWidths.filter((selectedWidth) => selectedWidth !== value);
            } else {
                return [...prevSelectedWidths, value];
            }
        });
    };

    const handleTyreTypeChange = (value) => {
        setSelectedTyreTypes((prevSelectedTypes) => {
            if (prevSelectedTypes.includes(value)) {
                return prevSelectedTypes.filter((selectedType) => selectedType !== value);
            } else {
                return [...prevSelectedTypes, value];
            }
        });
    };

    const handleTyreSizeChange = (value) => {
        setSelectedTyreSizes((prevSelectedSizes) => {
            if (prevSelectedSizes.includes(value)) {
                return prevSelectedSizes.filter((selectedSize) => selectedSize !== value);
            } else {
                return [...prevSelectedSizes, value];
            }
        });
    };

    const handleTyrePatternChange = (value) => {
        setSelectedTyrePatterns((prevSelectedPatterns) => {
            if (prevSelectedPatterns.includes(value)) {
                return prevSelectedPatterns.filter((selectedPattern) => selectedPattern !== value);
            } else {
                return [...prevSelectedPatterns, value];
            }
        });
    };

    const handleTyreRimChange = (value) => {
        setSelectedTyreRim((prevSelectedRims) => {
            const isRimSelected = prevSelectedRims.includes(value);

            if (isRimSelected) {
                return prevSelectedRims.filter((selectedRim) => selectedRim !== value);
            } else {
                return [...prevSelectedRims, value];
            }
        });
    };

    const renderFilter = (filterName, items, onChange, selectedPrama) => (
        <div className={styles.filter}>
            <div className={styles.filterTitle} onClick={() => toggleFilter(filterName)}>
                {filterName}
                <button >
                    {expandedFilters.includes(filterName) ? (
                        <AiFillCloseCircle className={styles.closeIcon} />
                    ) : (
                        <AiFillPlusCircle className={styles.plusIcon} />
                    )}
                </button>
            </div>
            {expandedFilters.includes(filterName) && (
                <form action="" style={{ display: 'flex', flexDirection: 'column' }}>
                    {items.map((item, key) => (
                        <div key={key} className={styles.checkboxWrap} >
                            <input
                                type="checkbox"
                                id={`${filterName}_${key}`}
                                name={`${filterName}_${key}`}
                                value={item.value}
                                onChange={() => onChange(item.value)}
                                checked={selectedPrama == item.value ? true : ''}
                            // checked={selectedItems && selectedItems.includes(item.value)}
                            />
                            <label htmlFor={`${filterName}_${key}`}>{item.value}</label>
                        </div>
                    ))}
                </form>
            )}
        </div>
    );

    const handleClearFilters = () => {
        console.log("clear");
        setMobileFilter(false);
        // Reset all filter selections
        setSelectedTyreBrands([]);
        setSelectedVehicleBrands([]);
        setSelectedTyreAspects([]);
        setSelectedTyreWidths([]);
        setSelectedTyreTypes([]);
        setSelectedTyreSizes([]);
        setSelectedTyrePatterns([]);
        setSelectedTyreRim([]);
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    return (
        <div className={styles.sectionWrap}>
            <div className={styles.filterWrap} id="child">
                <button className={styles.clearBtn} onClick={handleClearFilters}>
                    Clear Filter
                </button>
                {renderFilter('Tyre Brands', tyreBrand, handleTyreBrandChange, tyreBrandParam)}
                {renderFilter('Vehicle Types', vehicleType, handleVehicleTypeChange)}
                {renderFilter('Tyre Rims', tyreRim, handleTyreRimChange, rimParam)}
                {renderFilter('Tyre Patterns', tyrePattern, handleTyrePatternChange)}
                {renderFilter('Tyre Sizes', tyreSize, handleTyreSizeChange, sizeParam)}
                {renderFilter('Tyre Types', tyreType, handleTyreTypeChange)}
                {renderFilter('Tyre Widths', tyreWidth, handleTyreWidthChange, widthParam)}
                {renderFilter('Tyre Aspects', tyreAspect, handleTyreAspectChange)}
            </div>
            <div className={styles.mobileFilterWrap} id="child">
                <div className={styles.filterIcon}
                    onClick={() => setMobileFilter(true)}
                >
                    <LuFilter />
                    <div className="">Filter</div>
                </div>

                <div className={mobileFilter ? styles.mobile : styles.mobileNotActive}>
                    <div className={styles.filterClose}>
                        <GrFormClose onClick={() => setMobileFilter(false)} />
                    </div>
                    <div className={styles.btns}>
                        <button className={styles.clearBtn} onClick={handleClearFilters}>
                            Clear Filter
                        </button>
                        <button className={styles.clearBtn} onClick={() => setMobileFilter(false)}>
                            Apply Filter
                        </button>
                    </div>
                    {renderFilter('Tyre Brands', tyreBrand, handleTyreBrandChange)}
                    {renderFilter('Vehicle Types', vehicleType, handleVehicleTypeChange)}
                    {renderFilter('Tyre Rims', tyreRim, handleTyreRimChange)}
                    {renderFilter('Tyre Patterns', tyrePattern, handleTyrePatternChange)}
                    {renderFilter('Tyre Sizes', tyreSize, handleTyreSizeChange)}
                    {renderFilter('Tyre Types', tyreType, handleTyreTypeChange)}
                    {renderFilter('Tyre Widths', tyreWidth, handleTyreWidthChange)}
                    {renderFilter('Tyre Aspects', tyreAspect, handleTyreAspectChange)}
                </div>

            </div>
            <div className={styles.productList}>
                {data.map((item) => (
                    <Card data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
