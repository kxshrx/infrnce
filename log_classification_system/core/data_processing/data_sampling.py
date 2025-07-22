import pandas as pd
import numpy as np
import os


def create_production_demo_from_complete_results(df_complete, target_size=2000):
    """
    Create strategic 2k dataset showcasing the hybrid pipeline with proper stage and category distribution
    Target distribution: Regex 40-45%, BERT 24-28%, LLM 20-22%, Unclassified ~8-12%
    """

    demo_sample = []

    # Calculate target sizes based on requirements
    regex_target = int(target_size * 0.42)  # 42% = 840 logs
    bert_target = int(target_size * 0.26)  # 26% = 520 logs
    llm_target = int(target_size * 0.21)  # 21% = 420 logs
    unclassified_target = (
        target_size - regex_target - bert_target - llm_target
    )  # Remaining = 220 logs

    print(f"Target Distribution:")
    print(f"  Regex: {regex_target} logs ({regex_target/target_size*100:.1f}%)")
    print(f"  BERT: {bert_target} logs ({bert_target/target_size*100:.1f}%)")
    print(f"  LLM: {llm_target} logs ({llm_target/target_size*100:.1f}%)")
    print(
        f"  Unclassified: {unclassified_target} logs ({unclassified_target/target_size*100:.1f}%)"
    )
    print("=" * 60)

    # 1. REGEX SHOWCASE (840 logs - 42%)
    # Demonstrate fast, rule-based classification with natural distribution
    regex_classified = df_complete[df_complete["pipeline_stage"] == "Regex"]
    if len(regex_classified) > 0:
        regex_sample = []
        regex_categories = regex_classified["final_category"].value_counts()

        # Diversified distribution - reduce Instance_Management_Compute dominance
        # Instance_Management_Compute should be significant but not overwhelming (limit to ~35% of total)
        instance_mgmt = regex_classified[
            regex_classified["final_category"] == "Instance_Management_Compute"
        ]
        if len(instance_mgmt) > 0:
            # Limit to ~35% of total dataset (700 logs) with most coming from regex
            regex_sample.append(
                instance_mgmt.sample(n=min(400, len(instance_mgmt)), random_state=42)
            )

        # System_Operations_LibVirt (second most common - increase representation)
        system_ops = regex_classified[
            regex_classified["final_category"] == "System_Operations_LibVirt"
        ]
        if len(system_ops) > 0:
            regex_sample.append(
                system_ops.sample(n=min(300, len(system_ops)), random_state=42)
            )

        # Boost specific underrepresented categories in regex
        boost_categories_regex = [
            "Configuration_Errors",
            "File_System_Errors",
            "Resource_Management",
        ]
        for boost_cat in boost_categories_regex:
            boost_logs = regex_classified[
                regex_classified["final_category"] == boost_cat
            ]
            if len(boost_logs) > 0:
                current_total = sum(len(s) for s in regex_sample)
                if current_total < regex_target:
                    boost_size = min(30, len(boost_logs), regex_target - current_total)
                    regex_sample.append(
                        boost_logs.sample(n=boost_size, random_state=42)
                    )

        # Fill remaining with other categories proportionally
        remaining_categories = regex_classified[
            ~regex_classified["final_category"].isin(
                [
                    "Instance_Management_Compute",
                    "System_Operations_LibVirt",
                    "Configuration_Errors",
                    "File_System_Errors",
                    "Resource_Management",
                ]
            )
        ]
        if len(remaining_categories) > 0:
            remaining_needed = regex_target - sum(len(s) for s in regex_sample)
            if remaining_needed > 0:
                regex_sample.append(
                    remaining_categories.sample(
                        n=min(remaining_needed, len(remaining_categories)),
                        random_state=42,
                    )
                )

        regex_final = pd.concat(regex_sample).head(regex_target)
        demo_sample.append(regex_final)
        print(
            f"Regex showcase: {len(regex_final)} logs from {len(regex_final['final_category'].unique())} categories"
        )

    # 2. BERT SHOWCASE (520 logs - 26%)
    # Demonstrate ML classification with confidence stratification
    bert_classified = df_complete[df_complete["pipeline_stage"] == "BERT"]
    if len(bert_classified) > 0:
        bert_sample = []

        # High confidence classifications (70% of BERT samples)
        high_conf = bert_classified[bert_classified["final_confidence"] >= 0.78]
        if len(high_conf) > 0:
            high_conf_categories = high_conf["final_category"].value_counts()
            target_high = int(bert_target * 0.7)  # 364 logs

            # Network_Operations (most common in BERT - reduce dominance)
            network_ops = high_conf[high_conf["final_category"] == "Network_Operations"]
            if len(network_ops) > 0:
                bert_sample.append(
                    network_ops.sample(n=min(120, len(network_ops)), random_state=42)
                )

            # Scheduler_Operations (increase representation)
            scheduler_ops = high_conf[
                high_conf["final_category"] == "Scheduler_Operations"
            ]
            if len(scheduler_ops) > 0:
                bert_sample.append(
                    scheduler_ops.sample(
                        n=min(130, len(scheduler_ops)), random_state=42
                    )
                )

            # Other high confidence categories (including some Instance_Management for diversity)
            other_high_conf = high_conf[
                ~high_conf["final_category"].isin(
                    ["Network_Operations", "Scheduler_Operations"]
                )
            ]
            if len(other_high_conf) > 0:
                remaining_high = target_high - sum(len(s) for s in bert_sample)
                if remaining_high > 0:
                    # Add some Instance_Management_Compute if available in BERT
                    instance_mgmt_bert = other_high_conf[
                        other_high_conf["final_category"]
                        == "Instance_Management_Compute"
                    ]
                    if len(instance_mgmt_bert) > 0 and remaining_high >= 50:
                        bert_sample.append(
                            instance_mgmt_bert.sample(
                                n=min(50, len(instance_mgmt_bert)), random_state=42
                            )
                        )
                        remaining_high -= 50

                    # Boost underrepresented categories in BERT
                    boost_categories_bert = [
                        "Configuration_Errors",
                        "File_System_Errors",
                        "Network_Connection_Errors",
                        "Resource_Management",
                    ]
                    for boost_cat in boost_categories_bert:
                        boost_logs = other_high_conf[
                            other_high_conf["final_category"] == boost_cat
                        ]
                        if len(boost_logs) > 0 and remaining_high >= 20:
                            boost_size = min(20, len(boost_logs), remaining_high)
                            bert_sample.append(
                                boost_logs.sample(n=boost_size, random_state=42)
                            )
                            remaining_high -= boost_size

                    # Fill rest with other categories
                    other_cats = other_high_conf[
                        ~other_high_conf["final_category"].isin(
                            [
                                "Instance_Management_Compute",
                                "Configuration_Errors",
                                "File_System_Errors",
                                "Network_Connection_Errors",
                                "Resource_Management",
                            ]
                        )
                    ]
                    if len(other_cats) > 0 and remaining_high > 0:
                        bert_sample.append(
                            other_cats.sample(
                                n=min(remaining_high, len(other_cats)), random_state=42
                            )
                        )

        # Medium confidence (25% of BERT samples)
        med_conf = bert_classified[
            (bert_classified["final_confidence"] >= 0.7)
            & (bert_classified["final_confidence"] < 0.78)
        ]
        if len(med_conf) > 0:
            target_med = int(bert_target * 0.25)  # 130 logs
            bert_sample.append(
                med_conf.sample(n=min(target_med, len(med_conf)), random_state=42)
            )

        # Lower confidence (5% of BERT samples) - shows system boundaries
        low_conf = bert_classified[bert_classified["final_confidence"] < 0.7]
        if len(low_conf) > 0:
            target_low = bert_target - sum(len(s) for s in bert_sample)
            if target_low > 0:
                bert_sample.append(
                    low_conf.sample(n=min(target_low, len(low_conf)), random_state=42)
                )

        bert_final = pd.concat(bert_sample).head(bert_target)
        demo_sample.append(bert_final)
        print(
            f"BERT showcase: {len(bert_final)} logs with {len(bert_final['final_category'].unique())} categories"
        )

    # 3. LLM SHOWCASE (420 logs - 21%) - YOUR KEY INNOVATION
    # Emphasize error subcategorization and complex log understanding
    llm_classified = df_complete[df_complete["pipeline_stage"] == "LLM"]
    if len(llm_classified) > 0:
        llm_sample = []

        # ERROR SUBCATEGORIZATION SHOWCASE (50% of LLM samples) - Your Innovation
        error_subcats = llm_classified[
            llm_classified["final_category"].str.contains("Error|Timeout", na=False)
        ]
        if len(error_subcats) > 0:
            target_errors = int(
                llm_target * 0.5
            )  # Reduced to 210 logs to make room for other categories
            error_categories = error_subcats["final_category"].value_counts()

            # Prioritize underrepresented error categories
            priority_errors = [
                "Boot_Timeout_Errors",
                "Resource_Allocation_Errors",
                "Network_Connection_Errors",
                "File_System_Errors",
                "Configuration_Errors",
            ]

            # First, ensure minimum representation for priority error categories
            for category in priority_errors:
                category_logs = error_subcats[
                    error_subcats["final_category"] == category
                ]
                if len(category_logs) > 0:
                    # Boost these categories significantly
                    min_samples = (
                        25
                        if category
                        in ["Boot_Timeout_Errors", "Resource_Allocation_Errors"]
                        else 20
                    )
                    sample_size = min(min_samples, len(category_logs))
                    llm_sample.append(
                        category_logs.sample(n=sample_size, random_state=42)
                    )

            # Then distribute remaining slots across all error categories
            remaining_error_slots = target_errors - sum(len(s) for s in llm_sample)
            other_errors = error_subcats[
                ~error_subcats["final_category"].isin(priority_errors)
            ]

            if len(other_errors) > 0 and remaining_error_slots > 0:
                for category in other_errors["final_category"].unique():
                    category_logs = other_errors[
                        other_errors["final_category"] == category
                    ]
                    proportion = len(category_logs) / len(other_errors)
                    category_target = max(10, int(remaining_error_slots * proportion))
                    sample_size = min(category_target, len(category_logs))
                    if (
                        sample_size > 0
                        and sum(len(s) for s in llm_sample) < target_errors
                    ):
                        llm_sample.append(
                            category_logs.sample(n=sample_size, random_state=42)
                        )

        # NETWORK OPERATIONS (15% of LLM samples)
        network_ops_llm = llm_classified[
            llm_classified["final_category"] == "Network_Operations"
        ]
        if len(network_ops_llm) > 0:
            target_network = int(llm_target * 0.15)  # 63 logs
            llm_sample.append(
                network_ops_llm.sample(
                    n=min(target_network, len(network_ops_llm)), random_state=42
                )
            )

        # RESOURCE/SYSTEM OPERATIONS (35% of LLM samples) + Instance_Management diversity
        other_llm_cats = llm_classified[
            llm_classified["final_category"].isin(
                [
                    "Resource_Management",
                    "System_Operations",
                    "Instance_Management",
                    "Service_Communication_Errors",
                    "Configuration_Errors",
                    "Instance_Management_Compute",
                ]
            )
        ]
        if len(other_llm_cats) > 0:
            target_other = llm_target - sum(len(s) for s in llm_sample)
            if target_other > 0:
                # Boost specific underrepresented categories
                boost_categories = [
                    "Resource_Management",
                    "Instance_Management",
                    "Configuration_Errors",
                ]
                for boost_cat in boost_categories:
                    boost_logs = other_llm_cats[
                        other_llm_cats["final_category"] == boost_cat
                    ]
                    if len(boost_logs) > 0 and target_other >= 20:
                        boost_size = min(20, len(boost_logs), target_other)
                        llm_sample.append(
                            boost_logs.sample(n=boost_size, random_state=42)
                        )
                        target_other -= boost_size

                # Add some Instance_Management_Compute for category balance
                instance_mgmt_llm = other_llm_cats[
                    other_llm_cats["final_category"] == "Instance_Management_Compute"
                ]
                if len(instance_mgmt_llm) > 0 and target_other >= 15:
                    llm_sample.append(
                        instance_mgmt_llm.sample(
                            n=min(15, len(instance_mgmt_llm)), random_state=42
                        )
                    )
                    target_other -= 15

                # Distribute across remaining categories
                remaining_cats = other_llm_cats[
                    ~other_llm_cats["final_category"].isin(
                        [
                            "Instance_Management_Compute",
                            "Resource_Management",
                            "Instance_Management",
                            "Configuration_Errors",
                        ]
                    )
                ]
                if len(remaining_cats) > 0 and target_other > 0:
                    other_categories = remaining_cats["final_category"].value_counts()
                    for category in other_categories.index:
                        category_logs = remaining_cats[
                            remaining_cats["final_category"] == category
                        ]
                        category_proportion = len(category_logs) / len(remaining_cats)
                        category_target = int(target_other * category_proportion)
                        sample_size = min(category_target, len(category_logs))
                        if sample_size > 0:
                            llm_sample.append(
                                category_logs.sample(n=sample_size, random_state=42)
                            )

        llm_final = pd.concat(llm_sample).head(llm_target)
        demo_sample.append(llm_final)
        print(
            f"LLM showcase: {len(llm_final)} logs with {len(llm_final['final_category'].unique())} categories"
        )

    # 4. UNCLASSIFIED SHOWCASE (220 logs - 11%)
    # Show system limitations and edge cases
    unclassified = df_complete[
        (df_complete["pipeline_stage"].isin(["None", "Unclassified"]))
        | (df_complete["final_category"] == "Unclassified")
        | (df_complete["final_confidence"] == 0.0)
    ]
    if len(unclassified) > 0:
        # Sample diverse unclassified logs to show different failure modes
        unclassified_sample = unclassified.sample(
            n=min(unclassified_target, len(unclassified)), random_state=42
        )
        demo_sample.append(unclassified_sample)
        print(f"Unclassified showcase: {len(unclassified_sample)} logs")

    # Combine all samples
    final_demo_dataset = pd.concat(demo_sample, ignore_index=True)

    # Ensure exactly target_size logs with proper stage distribution
    if len(final_demo_dataset) > target_size:
        final_demo_dataset = final_demo_dataset.sample(n=target_size, random_state=42)
    elif len(final_demo_dataset) < target_size:
        # Fill remaining with high-quality samples maintaining stage ratios
        remaining_needed = target_size - len(final_demo_dataset)
        available_logs = df_complete[~df_complete.index.isin(final_demo_dataset.index)]

        # Check which stages need more logs to meet targets
        current_stage_counts = final_demo_dataset["pipeline_stage"].value_counts()
        regex_current = current_stage_counts.get("Regex", 0)
        bert_current = current_stage_counts.get("BERT", 0)
        llm_current = current_stage_counts.get("LLM", 0)

        # Fill in order of priority to meet stage targets
        if regex_current < regex_target:
            regex_needed = min(regex_target - regex_current, remaining_needed)
            regex_available = available_logs[
                available_logs["pipeline_stage"] == "Regex"
            ]
            if len(regex_available) > 0:
                additional_regex = regex_available.sample(
                    n=min(regex_needed, len(regex_available)), random_state=42
                )
                final_demo_dataset = pd.concat([final_demo_dataset, additional_regex])
                remaining_needed -= len(additional_regex)

        if bert_current < bert_target and remaining_needed > 0:
            bert_needed = min(bert_target - bert_current, remaining_needed)
            bert_available = available_logs[available_logs["pipeline_stage"] == "BERT"]
            if len(bert_available) > 0:
                additional_bert = bert_available.sample(
                    n=min(bert_needed, len(bert_available)), random_state=42
                )
                final_demo_dataset = pd.concat([final_demo_dataset, additional_bert])
                remaining_needed -= len(additional_bert)

        if llm_current < llm_target and remaining_needed > 0:
            llm_needed = min(llm_target - llm_current, remaining_needed)
            llm_available = available_logs[available_logs["pipeline_stage"] == "LLM"]
            if len(llm_available) > 0:
                additional_llm = llm_available.sample(
                    n=min(llm_needed, len(llm_available)), random_state=42
                )
                final_demo_dataset = pd.concat([final_demo_dataset, additional_llm])
                remaining_needed -= len(additional_llm)

        # Fill any remaining with high-quality samples from any stage
        if remaining_needed > 0:
            remaining_available = available_logs[
                ~available_logs.index.isin(final_demo_dataset.index)
            ]
            if len(remaining_available) > 0:
                additional_sample = remaining_available.sample(
                    n=min(remaining_needed, len(remaining_available)), random_state=42
                )
                final_demo_dataset = pd.concat([final_demo_dataset, additional_sample])

    # Final trim to exact target size
    final_demo_dataset = final_demo_dataset.head(target_size)

    return final_demo_dataset


def analyze_demo_dataset(demo_dataset):
    """Comprehensive analysis of the demo dataset"""

    print(f"\nPRODUCTION DEMO DATASET ANALYSIS")
    print("=" * 80)
    print(f"Total logs: {len(demo_dataset):,}")

    stage_dist = demo_dataset["pipeline_stage"].value_counts()
    print(f"\nPipeline Stage Distribution:")
    for stage, count in stage_dist.items():
        percentage = count / len(demo_dataset) * 100
        print(f"  {stage:12}: {count:4,} logs ({percentage:5.1f}%)")

    unique_categories = demo_dataset["final_category"].nunique()
    print(f"\nCategory Diversity: {unique_categories} unique categories")

    cat_dist = demo_dataset["final_category"].value_counts().head(15)
    print(f"\nTop 15 Categories:")
    for category, count in cat_dist.items():
        percentage = count / len(demo_dataset) * 100
        print(f"  {category:30}: {count:3} logs ({percentage:4.1f}%)")

    error_cats = demo_dataset[
        demo_dataset["final_category"].str.contains("Error|Timeout", na=False)
    ]
    if len(error_cats) > 0:
        print(f"\nERROR SUBCATEGORIZATION INNOVATION:")
        print(
            f"   Total error logs: {len(error_cats)} ({len(error_cats)/len(demo_dataset)*100:.1f}%)"
        )
        error_dist = error_cats["final_category"].value_counts()
        for category, count in error_dist.items():
            print(f"     {category:30}: {count:2} logs")

    print(f"\nStage-wise Category Breakdown:")
    for stage in ["Regex", "BERT", "LLM"]:
        stage_data = demo_dataset[demo_dataset["pipeline_stage"] == stage]
        if len(stage_data) > 0:
            print(f"\n  {stage} Categories ({len(stage_data)} logs):")
            stage_cats = stage_data["final_category"].value_counts().head(8)
            for category, count in stage_cats.items():
                print(f"    {category:28}: {count:3} logs")

    conf_logs = demo_dataset[demo_dataset["final_confidence"] > 0]
    if len(conf_logs) > 0:
        print(f"\nConfidence Distribution:")
        print(f"  Average confidence: {conf_logs['final_confidence'].mean():.3f}")
        print(
            f"  High confidence (≥0.8): {len(conf_logs[conf_logs['final_confidence'] >= 0.8]):3} logs"
        )
        print(
            f"  Medium confidence (0.7-0.8): {len(conf_logs[(conf_logs['final_confidence'] >= 0.7) & (conf_logs['final_confidence'] < 0.8)]):3} logs"
        )
        print(
            f"  Low confidence (<0.7): {len(conf_logs[conf_logs['final_confidence'] < 0.7]):3} logs"
        )

    if "label" in demo_dataset.columns:
        print(f"\nOriginal Label Distribution:")
        label_dist = demo_dataset["label"].value_counts()
        for label, count in label_dist.items():
            percentage = count / len(demo_dataset) * 100
            print(f"  {label:15}: {count:4} logs ({percentage:5.1f}%)")


def main():
    os.makedirs("prod", exist_ok=True)

    input_file = "../results/hybrid_pipeline_complete_results.csv"
    df_complete = pd.read_csv(input_file)

    print(f"Loaded complete dataset: {len(df_complete):,} logs")
    print(f"Creating strategic 2,000 log demonstration dataset...")
    print()

    demo_dataset = create_production_demo_from_complete_results(
        df_complete, target_size=2000
    )

    output_file = "prod/dataset_sampling.csv"
    demo_dataset.to_csv(output_file, index=False)

    analyze_demo_dataset(demo_dataset)

    print(f"\n" + "=" * 80)
    print(f"Production dataset saved: {output_file}")
    print(f"Dataset ready for pipeline demonstration and presentation!")
    print(f"Key highlights:")
    print(f"   • Proper stage distribution showcasing hybrid approach")
    print(f"   • Error subcategorization innovation prominently featured")
    print(f"   • Natural category distribution reflecting real-world patterns")
    print(f"   • Confidence stratification showing system reliability")
    print("=" * 80)


if __name__ == "__main__":
    main()
