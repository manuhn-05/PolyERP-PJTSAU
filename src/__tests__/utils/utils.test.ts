import { USER_TYPE_TEXTS } from "@/constants/auth-consts";
import { meanMaxMinCalculator,convertSensorDataForBackend, flattenRowData, addDaysToDate, getUserAccessLevels ,buildZodSchema} from "@/lib/utils";
import "@testing-library/jest-dom";
import { z } from "zod";


describe("Shoul test Utility Functions", function(){

    describe("Should test meanMacxMinCalculator fn()", function(){

        it("Should Calculate the currect mean,max, min values",()=>{

            const data = [
                { temperature: 20 },
                { temperature: 25 },
                { temperature: 18 },
                { temperature: 30 },
                { temperature: 22 },
            ];

            const results = meanMaxMinCalculator("temperature",data);

            expect(results).toEqual({
                meanValue : 23,
                maxValue : 30,
                minValue : 18
            })
        });

        it("Should handle if data is missing without causing any error", () => {
            const data = [
                { ec: 100 },
                { moisture: 10 },
                { temperature: 8 },
                { moisture: 22 },
                { moisture: 18, temperature: 12 },
            ];

            const results = meanMaxMinCalculator("moisture", data);

            expect(results).toEqual({
                meanValue: 10,
                maxValue: 22,
                minValue: 0
            })
        });

        // Edge Case
        it("Should Return Zeros if the data Array is Empty or undefined",()=>{
            const results = meanMaxMinCalculator("nitrogen",[]);
            expect(results).toEqual({
                meanValue : NaN, //  since reduce returns 0 and data.length = 0 - > 0 / 0 in JavaScript = NaN (Not a Number)
                maxValue:-Infinity , // Math.max() with no arguments returns -Infinity - Math.max() with no arguments returns -Infinity
                minValue:Infinity  // Math.min() with no arguments returns Infinity - returns Infinity (because it assumes “no min value yet”)
            })
        })
    });

    describe("Should run and test convertSensorDataForBackend fn()",function(){
        it("",()=>{

            const data = [{
                device_id : 2,
                ec_max: "2",
                ec_min: "1",
                installation_date: "2025-01-01",
                moisture_max : "30",
                moisture_min: "20",
                nitrogen_max : "20",
                nitrogen_min: "10",
                ph_max : "8",
                ph_min : "4",
                phosphorous_max : "23",
                phosphorous_min: "12",
                polyhouse_id : "6843vnvnlkdnlk12",
                potassium_max : "37",
                potassium_min: "25",
                salinity_max: "270",
                salinity_min: "100",
                sensor_name: "New Soil Probe",
                sensor_type: "soil_probe",
                status: "active",
                temperature_max: "40",
                temperature_min: "20"
            }]

            const results = convertSensorDataForBackend(data,data?.[0]?.device_id, data?.[0]?.sensor_name, data?.[0]?.sensor_type);

            expect(results).toEqual({
                device_id : 2,
                device_name : "New Soil Probe",
                ec:[1,2],
                moisture:[20,30],
                nitrogen:[10,20],
                ph:[4,8],
                phosphorous :[12,23],
                potassium : [25,37],
                salinity: [100,270],
                temperature:[20,40],
                polyhouse_id : "6843vnvnlkdnlk12",
                type : "soil_probe"
            });
        });
    });

    describe("Should Test flattenRowData fn()", function () {
        it("Should test and return key : value pair instead of nested key values", () => {
            const data = {
                end_indicator: 10, start_indicator: 10, labour: {
                    full_name: "Droid",
                    email: "blackdroid@example.com",
                },
                time_and_date : {
                    start_date : "2025-01-01",
                    end_date : "2025-01-02",
                },
                polyhouse_id: "6843vnvnlkdnlk12",
                type: "soil_probe"
            };

            const expectedData ={
                    end_indicator: 10, start_indicator: 10, full_name: "Droid",
                    email: "blackdroid@example.com",
                    start_date : "2025-01-01",
                    end_date : "2025-01-02",
                    polyhouse_id: "6843vnvnlkdnlk12",
                    type: "soil_probe"
                };

            const flatData = flattenRowData(data);
            expect(flatData).toEqual(expectedData);
        });

        it("should return empty object when input is null", () => {

            expect(flattenRowData(null)).toEqual({});
          });
          
          it("should return empty object when input is undefined", () => {

            expect(flattenRowData(undefined)).toEqual({});
          });
          
          it("should return empty object when input is empty object", () => {
            expect(flattenRowData({})).toEqual({});
          });
          
          it("should keep arrays as is and not flatten them", () => {
            const data = {
              items: [1, 2, 3],
              meta: { a: "x" }
            };
            const expected = { items: [1, 2, 3], a: "x" };
            expect(flattenRowData(data)).toEqual(expected);
          });
          it("should only flatten one level deep (not recursively)", () => {
            const data = {
              level1: {
                level2: { name: "deep" }
              }
            };
            const expected = { level2: { name: "deep" } }; // only one level flatten
            expect(flattenRowData(data)).toEqual(expected);
          });

          it("should overwrite duplicate child keys from later objects", () => {
            const data = {
              user1: { name: "A" },
              user2: { name: "B" }
            };
            const expected = { name: "B" }; // last one wins
            expect(flattenRowData(data)).toEqual(expected);
          });
          
          it("should return empty object for non-object inputs", () => {

            expect(flattenRowData(123)).toEqual({});

            expect(flattenRowData("test")).toEqual({});
          });
          
          
    });

    describe("Test addDaysToDate fn()",function(){
        it(" Should return number of days added to date", () => {
            const presentDate = "2025-10-01";
            const numberOfDaysToAdd = 10;
            const expectedDate = "2025-10-11";
            const returnedDate = addDaysToDate(presentDate, numberOfDaysToAdd);
            expect(returnedDate).toEqual(expectedDate);
        })
        it("Should return empty String when date is empty / null", () => {
            const presentDate = "";
            const numberOfDaysToAdd = 10;
            const expectedDate = "";
            const returnedDate = addDaysToDate(presentDate, numberOfDaysToAdd);
            expect(returnedDate).toEqual(expectedDate);
        });
        it("Should return same date if number of days to add is null or zero",()=>{
            const presentDate ="2025-11-01";
            const numberOfDaysToAdd = 0;
            const expectedDate = "2025-11-01";
            const returnedDate = addDaysToDate(presentDate, numberOfDaysToAdd);
            expect(returnedDate).toEqual(expectedDate);
        });
        it("Should return empty string for invalid date input", () => {
            const presentDate = "invalid-date";
            const numberOfDaysToAdd = 10;
            const expectedDate = "";
            const returnedDate = addDaysToDate(presentDate, numberOfDaysToAdd);
            expect(returnedDate).toEqual(expectedDate);
          });
          it("Should subtract days correctly when daysToAdd is negative", () => {
            const presentDate = "2025-10-10";
            const numberOfDaysToAdd = -5;
            const expectedDate = "2025-10-05";
            const returnedDate = addDaysToDate(presentDate, numberOfDaysToAdd);
            expect(returnedDate).toEqual(expectedDate);
          });
          
          
    });

    describe("Test getUserAccessLevels fn()",function(){
        it(" Should Return true for all if user_type is Owner even if path is not found or access is empty",()=>{
        
            const accessLevel = getUserAccessLevels([],"", USER_TYPE_TEXTS.OWNER);

            const expectedAccessLevel = {
                "create": true,
                "delete": true,
                "read": true,
                "update": true
            }
            expect(accessLevel).toEqual(expectedAccessLevel);
        })
        it(" Should Return the If the Access Level is Given or Not for the provided module path",()=>{
            const access=[
                {
                    "accessLevelGiven": true,
                    "isSelected": true,
                    "mod_id": "module-50",
                    "path": "jobs",
                    "subAccessLevel": {
                        "create": true,
                        "delete": true,
                        "read": true,
                        "update": true
                    },
                    "title": "Jobs"
                },
                {

                    "accessLevelGiven": true,
                    "isSelected": true,
                    "mod_id": "module-51",
                    "path": "stocks",
                    "subAccessLevel": {
                        "create": true,
                        "delete": true,
                        "read": true,
                        "update": true
                    },
                    "title": "Stocks"
                }
            ]
            const accessLevel = getUserAccessLevels(access,"stocks", USER_TYPE_TEXTS.ADMIN);

            const expectedAccessLevel = {
                "create": true,
                "delete": true,
                "read": true,
                "update": true
            }
            expect(accessLevel).toEqual(expectedAccessLevel);
        });
        it(" Should return false if access is empty or path is not found",()=>{
            const access : any=[]
            const accessLevel = getUserAccessLevels(access,"stocks", USER_TYPE_TEXTS.ADMIN);
            expect(accessLevel).toEqual(false);
        });
        it("Should return false if access is not an array for ADMIN", () => {
            // @ts-ignore
            const accessLevel = getUserAccessLevels(null, "stocks", USER_TYPE_TEXTS.ADMIN);
            expect(accessLevel).toBe(false);
          });
          it("Should return false if module exists but is not selected", () => {
            const access = [
              {
                path: "stocks",
                isSelected: false,
                subAccessLevel: { create: true, read: true, update: true, delete: true }
              }
            ];
            const accessLevel = getUserAccessLevels(access, "stocks", USER_TYPE_TEXTS.ADMIN);
            expect(accessLevel).toBe(false);
          });
          it("Should return false if module path not found for ADMIN", () => {
            const access = [
              { path: "jobs", isSelected: true, subAccessLevel: { create: true, read: true, update: true, delete: true } }
            ];
            const accessLevel = getUserAccessLevels(access, "nonexistent", USER_TYPE_TEXTS.ADMIN);
            expect(accessLevel).toBe(false);
          });
          it("Should return false for unknown user type", () => {
            const access = [
              { path: "stocks", isSelected: true, subAccessLevel: { create: true, read: true, update: true, delete: true } }
            ];
            const accessLevel = getUserAccessLevels(access, "stocks", "UNKNOWN");
            expect(accessLevel).toBe(false);
          });
          
          
          
          
    });


 

describe("buildZodSchema()", () => {
  it("should build schema with required text field", () => {
    const fields = [
      { key: "name", label: "Name", type: "text", required: true }
    ];
    const schema = buildZodSchema(fields);
    expect(() => schema.parse({ name: "" })).toThrow("Name is required");
    expect(schema.parse({ name: "John" })).toEqual({ name: "John" });
  });

  it("should validate email field correctly", () => {
    const fields = [
      { key: "email", label: "Email", type: "email", required: true }
    ];
    const schema = buildZodSchema(fields);

    expect(() => schema.parse({ email: "notanemail" })).toThrow(
      "Email must be a valid email"
    );
    expect(schema.parse({ email: "john@example.com" })).toEqual({
      email: "john@example.com"
    });
  });

  it("should validate number field correctly", () => {
    const fields = [
      { key: "age", label: "Age", type: "number", required: true }
    ];
    const schema = buildZodSchema(fields);

    expect(() => schema.parse({ age: "" })).toThrow("Age must be a number");
    expect(schema.parse({ age: 25 })).toEqual({ age: 25 });
  });

  it("should handle optional non-required fields", () => {
    const fields = [
      { key: "nickname", label: "Nickname", type: "text", required: false }
    ];
    const schema = buildZodSchema(fields);
    expect(schema.parse({})).toEqual({});
  });

  it("should apply min and max validation", () => {
    const fields = [
      {
        key: "username",
        label: "Username",
        type: "text",
        required: true,
        validation: { min: 3, max: 10 }
      }
    ];
    const schema = buildZodSchema(fields);

    expect(() => schema.parse({ username: "Jo" })).toThrow("Username too small/short");
    expect(() => schema.parse({ username: "Johndoeisaverylongname" })).toThrow(
      "Username too large/long"
    );
    expect(schema.parse({ username: "John" })).toEqual({ username: "John" });
  });

  it("should validate regex patterns", () => {
    const fields = [
      {
        key: "code",
        label: "Code",
        type: "text",
        required: true,
        validation: { regex: "^[A-Z0-9]+$" }
      }
    ];
    const schema = buildZodSchema(fields);

    expect(() => schema.parse({ code: "abc" })).toThrow("Code invalid");
    expect(schema.parse({ code: "ABC123" })).toEqual({ code: "ABC123" });
  });

  it("should handle select fields with required true", () => {
    const fields = [
      { key: "country", label: "Country", type: "select", required: true }
    ];
    const schema = buildZodSchema(fields);

    expect(() => schema.parse({ country: "" })).toThrow("Country is required");
    expect(schema.parse({ country: "India" })).toEqual({ country: "India" });
  });

  it("should return schema that accepts unknown types using z.any()", () => {
    const fields = [
      { key: "misc", label: "Misc", type: "unknownType", required: false }
    ];
    const schema = buildZodSchema(fields);
    expect(schema.parse({ misc: { something: 123 } })).toEqual({
      misc: { something: 123 }
    });
  });

  it("should gracefully handle empty fields array", () => {
    const schema = buildZodSchema([]);
    expect(schema.parse({})).toEqual({});
  });
  it("should create schema for date field (required)", () => {
    const fields = [
      { key: "dob", label: "Date of Birth", type: "date", required: true },
    ];

    const schema = buildZodSchema(fields);

    // Valid date (string)
    expect(schema.parse({ dob: "2025-10-25" })).toEqual({ dob: "2025-10-25" });

    // Invalid (empty)
    expect(() => schema.parse({ dob: "" })).toThrow("Date of Birth is required");
  });

  it("should create schema for date field (optional)", () => {
    const fields = [
      { key: "dob", label: "Date of Birth", type: "date", required: false },
    ];

    const schema = buildZodSchema(fields);

    // Optional means can be undefined or missing
    expect(schema.parse({})).toEqual({});

    // Still valid when provided
    expect(schema.parse({ dob: "2025-10-25" })).toEqual({ dob: "2025-10-25" });
  });
});

})